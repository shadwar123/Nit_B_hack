
import "./SpeechToText.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";
import { useSpeechSynthesis } from 'react-speech-kit';

const SpeechToText = () => {
    const [textToCopy, setTextToCopy] = useState();
    const { speak } = useSpeechSynthesis();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    console.log('listining',transcript)


    if (!browserSupportsSpeechRecognition) {
        return null
    }
    const startList = () => {
        speak({ text: 'Start listining', lang: 'en' });
    }
    const Copy = () => {
        speak({ text: 'Copy to clip board', lang: 'en' });
    }
    const stopl = () => {
        speak({ text: 'Stop listining', lang: 'en' });
    }

    return (
        <>
            <div className="container">
                <h2>Speech to Text Converter</h2>
                <br/>
                <p>A voice-activated tool, the Speech-to-Text Converter simplifies email writing. Speak, and it transcribes, offering a hands-free, efficient alternative.</p>

                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style">

                    <button onClick={(e) =>{setCopied(e); Copy(e)}}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button onClick={(e) => {startListening(e); startList(e)}}>Start Listening</button>
                    <button onClick={(e) => {SpeechRecognition.stopListening(e); stopl(e)} } >Stop Listening</button>

                </div>

            </div>

        </>
    );
};

export default SpeechToText;
