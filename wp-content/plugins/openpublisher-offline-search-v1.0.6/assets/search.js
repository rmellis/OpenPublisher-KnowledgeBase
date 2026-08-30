document.addEventListener("DOMContentLoaded", function() {
    var searchInputs = document.querySelectorAll('input[type="search"], input[name="s"]');
    
    var searchIndex = null;
    
    // DYNAMIC RELATIVE PATH RESOLUTION
    var jsonUrl = '/wp-content/uploads/op-search-index.json'; 
    var basePath = '';
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].getAttribute('src');
        if (src && src.includes('openpublisher-offline-search')) {
            var wpContentIndex = src.indexOf('wp-content/');
            if (wpContentIndex !== -1) {
                basePath = src.substring(0, wpContentIndex);
                jsonUrl = basePath + 'wp-content/uploads/op-search-index.json';
                break;
            }
        }
    }
        
    var isStaticOffline = (window.location.protocol === 'file:' || window.location.href.includes('index.htm') || window.location.hostname === 'localhost');
    
    // BRUTE FORCE LINK FIXER
    // Scans the entire page and absolutely destroys any remaining live server links, 
    // replacing them with purely relative offline routes.
    var allLinks = document.querySelectorAll('a');
    allLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href && href.includes('acr.floydcraft.co.uk/openpublisher')) {
            var relativeTarget = href.split('acr.floydcraft.co.uk/openpublisher')[1];
            
            // Remove leading slash
            if (relativeTarget.startsWith('/')) {
                relativeTarget = relativeTarget.substring(1);
            }
            
            var finalLink = basePath + relativeTarget;
            
            if (isStaticOffline && (finalLink === '' || finalLink.endsWith('/'))) {
                finalLink += 'index.htm';
            }
            if (finalLink === '') {
                finalLink = 'index.htm';
            }
            link.setAttribute('href', finalLink);
        }
    });

    if(searchInputs.length === 0) return;
    
    // FETCH THE JSON IMMEDIATELY ON LOAD! 
    fetch(jsonUrl) 
    .then(res => {
        if(!res.ok) throw new Error("Network response was not ok");
        return res.json();
    })
    .then(data => { 
        searchIndex = data; 
        searchInputs.forEach(function(input) {
            if(input.value.trim().length >= 2) {
                input.dispatchEvent(new Event("input"));
            }
        });
    })
    .catch(err => {
        console.error("Failed to load search index:", err);
        searchInputs.forEach(function(input) {
            var wrapper = input.parentNode;
            if(wrapper) {
                var res = wrapper.querySelector('.opub-search-results');
                if(res) {
                    res.innerHTML = '<div style="padding: 15px 20px; color: #cc0000; font-family: sans-serif;">Error: Could not load local search database. Please ensure you exported the op-search-index.json file.</div>';
                }
            }
        });
    });
    
    var style = document.createElement("style");
    style.innerHTML = `
        @keyframes opubThrobGlow {
            0% { box-shadow: 0 8px 30px rgba(0,0,0,0.2); border-color: #007670; }
            50% { box-shadow: 0 0 25px 8px rgba(0, 118, 112, 0.45); border-color: #00bfa5; }
            100% { box-shadow: 0 8px 30px rgba(0,0,0,0.2); border-color: #007670; }
        }
        .opub-throb-anim {
            animation: opubThrobGlow 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
    
    searchInputs.forEach(function(input) {
        var form = input.closest('form');
        if(!form) return;
        
        function killEvent(e) {
            if(e && e.stopPropagation) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
        
        input.addEventListener("keyup", killEvent, true);
        input.addEventListener("keypress", killEvent, true);
        
        var resultsContainer = document.createElement("div");
        resultsContainer.className = "opub-search-results";
        resultsContainer.style.position = "absolute";
        resultsContainer.style.top = "100%";
        resultsContainer.style.left = "0";
        resultsContainer.style.right = "0";
        resultsContainer.style.width = "100%";
        resultsContainer.style.backgroundColor = "#ffffff";
        resultsContainer.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
        resultsContainer.style.borderRadius = "0 0 8px 8px";
        resultsContainer.style.maxHeight = "500px";
        resultsContainer.style.overflowY = "auto";
        resultsContainer.style.zIndex = "2147483647"; 
        resultsContainer.style.display = "none";
        
        resultsContainer.style.border = "2px solid #007670";
        resultsContainer.style.borderTop = "none";
        resultsContainer.style.marginTop = "2px";
        
        function triggerThrob() {
            if (resultsContainer.style.display !== "none") {
                resultsContainer.classList.remove("opub-throb-anim");
                void resultsContainer.offsetWidth; 
                resultsContainer.classList.add("opub-throb-anim");
            }
        }
        
        input.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                killEvent(e);
                triggerThrob();
            }
        }, true);
        
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            killEvent(e);
            triggerThrob();
        }, true);

        form.addEventListener("click", function(e) {
            if(resultsContainer.contains(e.target)) return;
            if(e.target === input) return;
            
            e.preventDefault();
            killEvent(e);
            input.focus();
            triggerThrob();
        }, true);
        
        form.style.position = 'relative';
        form.style.overflow = 'visible';
        var formParent = form.parentNode;
        if(formParent) {
            formParent.style.overflow = 'visible';
        }
        
        form.appendChild(resultsContainer);
        
        input.addEventListener("input", function(e) {
            killEvent(e);
            
            var query = this.value.toLowerCase().trim();
            if(query.length < 2) {
                resultsContainer.style.display = "none";
                return;
            }
            
            if(!searchIndex) {
                resultsContainer.innerHTML = '<div style="padding: 15px 20px; color: #777; font-family: sans-serif;">Loading...</div>';
                resultsContainer.style.display = "block";
                return;
            }
            
            var matches = searchIndex.filter(function(article) {
                return article.title.toLowerCase().includes(query) || (article.excerpt && article.excerpt.toLowerCase().includes(query));
            });
            
            resultsContainer.innerHTML = "";
            if(matches.length === 0) {
                resultsContainer.innerHTML = '<div style="padding: 15px 20px; color: #777; font-family: sans-serif;">No articles found matching "' + query + '".</div>';
            } else {
                matches.forEach(function(match) {
                    
                    var finalLink = match.link;
                    if (finalLink.includes('acr.floydcraft.co.uk/openpublisher')) {
                        var relT = finalLink.split('acr.floydcraft.co.uk/openpublisher')[1];
                        if(relT.startsWith('/')) relT = relT.substring(1);
                        finalLink = basePath + relT;
                        if (isStaticOffline && (finalLink === '' || finalLink.endsWith('/'))) {
                            finalLink += 'index.htm';
                        }
                        if(finalLink === '') finalLink = 'index.htm';
                    }
                
                    var a = document.createElement("a");
                    a.href = finalLink;
                    a.style.display = "block";
                    a.style.padding = "16px 20px";
                    a.style.color = "#333";
                    a.style.textDecoration = "none";
                    a.style.borderBottom = "1px solid #f0f0f0";
                    a.style.fontFamily = "sans-serif";
                    a.style.transition = "background-color 0.15s";
                    
                    var regex = new RegExp("(" + query.replace(/[.*+?^${}()|[\]\\\\]/g, '\\\\$&') + ")", "gi");
                    var highlightedTitle = match.title.replace(regex, '<span style="color: #007670; font-weight: bold;">$1</span>');
                    
                    var excerptHtml = "";
                    if(match.excerpt) {
                        var highlightedExcerpt = match.excerpt.replace(regex, '<span style="color: #007670; font-weight: bold;">$1</span>');
                        excerptHtml = '<div style="font-size: 13px; color: #666; margin-top: 4px; line-height: 1.4;">' + highlightedExcerpt + '...</div>';
                    }
                    
                    a.innerHTML = '<div style="font-size: 16px; font-weight: 500; color: #1a1a1a;">' + highlightedTitle + '</div>' + excerptHtml;
                    
                    a.onmouseover = function() { this.style.backgroundColor = "#f8f9fa"; };
                    a.onmouseout = function() { this.style.backgroundColor = "#ffffff"; };
                    
                    resultsContainer.appendChild(a);
                });
            }
            
            resultsContainer.style.display = "block";
        }, true);
        
        document.addEventListener("click", function(e) {
            if(e.target !== input && !resultsContainer.contains(e.target)) {
                resultsContainer.style.display = "none";
            }
        });
    });
});
