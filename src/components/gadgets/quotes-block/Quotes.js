import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

const quotes = [
    "“ You can have it all. Just not all at once. ”",
    "“ You may delay, but time will not. ”",
    "“ Tomorrow is often the busiest day of the week. ”",
    "“ The bad news is time flies. The good news is you’re the pilot ”",
    "“ Never look back unless you are planning to go that way. ”",
    "“ Never begin the day until it is finished on paper. ”",
    "“ A man who dares to waste one hour of life has not discovered the value of life. ”",
    "“ If I had six hours to chop down a tree, I would spend the first four hours sharpening the axe. ”",
    "“ The key is in not spending time, but in investing it. ”",
    "“ One can find time for everything if one is never in a hurry. ”",
    "“ To do two things at once is to do neither. ”",
    "“ The shorter way to do many things is to only do one thing at a time. ”",
    "“ Be like a postage stamp — stick to one thing until you get there. ”",
    "“ One always has time enough, if one will apply it well. ”",
    "“ Your future is created by what you do today, not tomorrow. ”",
    "“ The time you `Enjoy` wasting is not wasted time. ”",
    "“ If you don’t know where you are going, you’ll end up someplace else. ”",
    "“ Unless commitment is made, there are only promises and hopes; but no plans. ”",
    "“ Making a plan without the right tools is like making spaghetti without a pot. ”",
    "“ Before anything else, preparation is the key to success. ”",
    "“ To achieve great things, two things are needed; a plan, and not quite enough time. ”",
    "“ I don’t believe in failure. It’s not failure if you enjoyed the process. ”"
]

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const mapStateToProps = (state, props) => {
    return {
        message: (state.toast && state.toast.msg) ? state.toast.msg : quotes[getRandomInt(0, 22)]
    }
}

const typewriterEffect = (el, callback) => {
    el.classList.remove('typewriterEffect');
    setTimeout(() => {
        el.classList.add('typewriterEffect');

        callback();
    }, 500);
}

const Quotes = ( props ) => {
    const ref = useRef();
    const [ quote, setQuote ] = useState( quotes[getRandomInt(0, 22)] );

    useEffect(() => {
        console.log('msg change:', props.message);
        
        typewriterEffect(ref.current, () => {
            setQuote(props.message);
        });

        const interval = setInterval( () => {
            typewriterEffect(ref.current, () => {
                setQuote( quotes[getRandomInt(0, 22)] );
            });
        }, 10000) ;

        return () => {
            clearInterval( interval );
        }
    }, [props.message]);

    return <div ref={ref} className="typewriterEffect">
        { quote }
    </div>
}

export default connect(mapStateToProps)(Quotes);