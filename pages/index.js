import React, {useEffect, useState, useRef} from 'react';
import "../styles.css";

const Index = () => {
    const suggestions = ['toffe pee', 'developer', 'pintjesdrinker'];
    const [suggestion, setSuggestion] = useState(suggestions[0]);
    const textWrapper = useRef(null);
    function triggerCharacters() {
        console.log(suggestion);
        textWrapper.current.innerHTML = suggestion.replace(/\S/g, "<span class='letter'>$&</span>");
        var sentenceDelay = 600;
    
          // Trigger for each sentence
          setTimeout(function() {
            const spans = textWrapper.current.querySelectorAll('span');
            var spanCounter = 0;
            var spanDelay = 75;

            spans.forEach((el) => {
                setTimeout(function() {
                    el.classList.toggle('active');
                  }, (spanCounter * spanDelay));
          
                  spanCounter++; 
            });
          }, (sentenceDelay));
      }
    useEffect(() => {
        if (textWrapper.current) {
            triggerCharacters();
            setInterval(() => {
                console.log(Math.floor(Math.random() * suggestions.length));
                setSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
                triggerCharacters();
            }, 5000);
        }
    }, []);
    return (
        <div>
            <p>Thomas is een <span ref={textWrapper} className="sentence">{suggestion}</span></p>
        </div>
    )
};

export default Index;