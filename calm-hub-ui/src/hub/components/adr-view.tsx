import 'react-json-view-lite/dist/index.css';
import { Adr } from '../../model/calm.js';
import Markdown from 'react-markdown';
import {
    displayConsideredOptions,
    displayDecisionDrivers,
    displayLinks,
    getDate,
} from '../../helper-functions/adr-helper-functions.js';

interface JsonRendererProps {
    jsonString: Adr | undefined;
}

export function AdrRenderer({ jsonString }: JsonRendererProps) {
    const defaultMessage = <div className="text-center">Please select an ADR to load</div>;
    let adr = undefined;
    console.log(jsonString);

    if (jsonString !== undefined) {
        adr = jsonString?.adr;
    }

    const jsonView = (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded float-right"
                onClick={handleClick}
            >
                Edit
            </button>

            <div className="font-bold inline text-3xl"> {adr && adr!.title}</div>
            <div className="inline bg-orange-500 w-15 rounded-full text-center text-xs p-1 ms-3 text-white font-bold">
                Draft
            </div>

            <div className="pt-5 pb-5">
                <p className="font-bold border-b border-blue-200 text-lg text-blue-500">
                    Context and Problem
                </p>
                <div className="pt-1 pe-2">
                    <Markdown>{adr && adr!.contextAndProblemStatement}</Markdown>
                </div>
            </div>

            <div className="pb-5">
                <p className="font-bold border-b border-blue-200 text-lg text-blue-500">
                    Decision Drivers
                </p>
                <div className="pt-1 pe-2">
                    {adr && displayDecisionDrivers(adr!.decisionDrivers)}
                </div>
            </div>

            <div className="pb-5">
                <p className="font-bold border-b border-blue-200 text-lg text-blue-500">
                    Considered Options
                </p>
                {adr && displayConsideredOptions(adr!.consideredOptions)}

                {/* mock up of a closed option */}
                <div className="border  border-l-4  border-black-500 p-2 pt-2">
                    <p className="inline font-bold"> Example collapsed option</p>
                    <p className="inline float-right w-5"> {'⌄'} </p>
                </div>
            </div>

            <div className="pb-5">
                <p className="font-bold border-b border-blue-200 text-lg text-blue-500">
                    Decision Outcome
                </p>
                {adr && displayConsideredOptions([adr!.decisionOutcome.chosenOption])}
                <br></br>
                <p className="font-bold"> Rational:</p>
                <div className="pt-2 pe-2">
                    <Markdown>{adr && adr!.decisionOutcome.rationale}</Markdown>
                </div>
            </div>

            <div className="pb-5">
                <p className="font-bold border-b border-blue-200 text-lg text-blue-500"> Links </p>
                <div className="pt-1 pe-2"> {adr && displayLinks(adr!.links)} </div>
            </div>

            <div className="italic">
                <div>
                    Created on
                    <p className="font-bold inline"> {adr && getDate(adr.creationDateTime)}</p>
                </div>
                <div>
                    Last updated on
                    <p className="font-bold inline"> {adr && getDate(adr.updateDateTime)}</p>
                </div>
            </div>
        </div>
    );

    function handleClick() {
        // edit funtionality
        console.log('editing mode');
    }

    const content = jsonString && jsonString.adr ? jsonView : defaultMessage;

    return (
        <div className="p-5 flex-1 overflow-auto border-l-2 border-black bg-white">{content}</div>
    );
}
