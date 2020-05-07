import React, {useState, useEffect} from 'react';
import './Translater.css';
import TranslateUtils from './utils/index'
import * as trTypes from './utils/types'
import { translate } from '../../ts/utils/translate';
import { stat } from 'fs';


const selectLang: React.FC = (TranStat, SetTransState) => {
    const langList = TranslateUtils.getSupportedLangList("en")

    return (
        <select>
            {}
        </select>
    )
}


interface ITranslateState {
    input: string | undefined,
    translated: string;
    setupLang: string;
    translateDirection: string;
}

async function TranslateText(
    text: string | undefined,
    state: ITranslateState,
    setState: React.Dispatch<React.SetStateAction<ITranslateState>>,
    ) {
    TranslateUtils.translate(text as string, state.translateDirection).then(
        (translated)=>{
            let newState: ITranslateState = Object.assign({}, state);
            let trText: string = (translated as trTypes.ITranslateAPIResponse).text[0];
            newState.translated = trText;
            setState(newState)
            console.log(state)
        }
    )
}

const Translater: React.FC = () => {
    let initState = {
        input: "",
        translated: '',
        setupLang: 'ru',
        translateDirection: 'en',
    }
    const [state, setState] = useState<ITranslateState>(initState as ITranslateState)
    let inputForm = React.createRef<HTMLTextAreaElement>();
    // start monitoring user input 
    useEffect(() => {
        setInterval(()=>{
            console.log(inputForm)
            if(inputForm.current?.value != state.input) {
                let newState: ITranslateState = Object.assign({}, state);
                const text = Object.assign({}, inputForm.current?.value)
                newState.input = text
                setState(newState)
                //TranslateText(newState.input, state as ITranslateState, setState)
            }
        }, 2000)
    }, [])
    return (
        <div className="TranslaterHolder">
            <div className="InputHolder">
                <p>source lang: {state.setupLang}</p>
                <textarea
                ref={inputForm}
                className="Input" onInput={
                    (e)=>{
                        
                    }
                }/>
            </div>
            <div className="OutputHolder">
                <p>dest lang: {state.translateDirection}</p>
                <textarea className="Output" value={state.translated}/>
            </div>
        </div>
    )
}

export default Translater;