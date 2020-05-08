import React, {useState, useEffect, useRef} from 'react';
import './Translater.css';
import TranslateUtils from './utils/index'
import * as trTypes from './utils/types'
import useInterval from './useInterval';
interface ISelectLangState {
    langs: {[ind: string]:string}
}



interface Props {
    isSource: boolean, //with or without auto option
    TranState: ITranslateState,
    SetTransState: React.Dispatch<React.SetStateAction<ITranslateState>>
}
  
const SelectLang: React.FC<Props> = ((props) => {
    const [state, setState] = useState<ISelectLangState>();
    useEffect(() => {
        TranslateUtils.getSupportedLangList("en")
        .then((response) => {
            let initialState = {
                langs: (response as trTypes.ILangListAPIResponse).langs 
            }
            setState(initialState as ISelectLangState)
        })
    }, []);

    let selectJSX: JSX.Element[] = [];
    for (const lang in state?.langs) {
        selectJSX.push(
            (<option> {state?.langs[lang]} </option>)
        )
    }
    return (
        <select onChange={(e)=>{
            const langName = e.target.value;
            for (const lang in state?.langs) {
                if(state?.langs[lang] === langName) {
                    let newTranState = Object.assign({}, props.TranState);
                    if(props.isSource)
                        newTranState.trSource = lang;
                    else
                        newTranState.trDest = lang;
                    props.SetTransState(newTranState);
                    return
                }
            }
            // change mode on auto mode
            if(props.isSource) {
                let newTranState = Object.assign({}, props.TranState);
                newTranState.trSource = "";
                props.SetTransState(newTranState);
            }
        }}>
            {props.isSource && <option> auto </option>}
            {selectJSX}
        }
        </select>
    )
})


interface ITranslateState {
    input: string | undefined,
    translated: string;
    trDest: string;
    trSource: string
}

async function TranslateText(
    text: string | undefined,
    state: ITranslateState,
    setState: React.Dispatch<React.SetStateAction<ITranslateState>>,
    ) {
    TranslateUtils.translate(
        text as string,
        state.trSource == "" ? state.trDest : state.trSource + '-' + state.trDest,
        ).then(
        (translated)=>{
            let newState: ITranslateState = Object.assign({}, state);
            let trText: string = (translated as trTypes.ITranslateAPIResponse).text[0];
            newState.translated = trText;
            setState(newState)
        }
    )
}

const Translater: React.FC = () => {
    let initState = {
        input: "",
        translated: '',
        trDest: 'en',
        trSource: '', // empty string means auto detection
    }
    const [state, setState] = useState<ITranslateState>(initState as ITranslateState)
    let inputForm: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null) 
    // start monitoring user input 
    useInterval(updateTransText, 1000);
    useEffect(() => {
    }, [])
    function updateTransText() {
        if(inputForm.current?.value != state.input) {
            let newState: ITranslateState = Object.assign({}, state);
            newState.input = inputForm.current?.value
            setState(newState)
            TranslateText(newState.input, state as ITranslateState, setState)
            console.log(state);
        }
    }
    return (
        <div className="TranslaterHolder">
            <div className="InputHolder">
                <p>source lang: 
                    <SelectLang isSource={true} TranState={state} SetTransState={setState} /></p>
                <textarea
                ref={inputForm}
                className="Input" onInput={
                    (e)=>{
                        
                    }
                }/>
            </div>
            <div className="OutputHolder">
                <p>
                    dest lang: <SelectLang isSource={false} TranState={state} SetTransState={setState}></SelectLang> 
                </p>
                <textarea className="Output" value={state.translated}/>
            </div>
        </div>
    )
}

export default Translater;