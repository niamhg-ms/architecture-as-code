import 'react-json-view-lite/dist/index.css';
import { Adr } from '../../model/calm.js';
import Markdown from 'react-markdown';
import {
    displayConsideredOptions,
    displayDecisionDrivers,
    displayLinks,
    getDate,
    styleTitle,
} from '../../helper-functions/adr-helper-functions.js';

interface AdrRendererProps {
    adrDetails: Adr | undefined;
}

export function AdrRenderer({ adrDetails }: AdrRendererProps) {
    const defaultMessage = <div className="text-center">Please select an ADR to load</div>;
    let adr = undefined;

    if (adrDetails !== undefined) {
        adr = adrDetails?.adr;
    }

    const adrView = (
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
                {styleTitle('Context and Problem')}

                <div className="pt-1 pe-2">
                    <Markdown>{adr && adr!.contextAndProblemStatement}</Markdown>
                </div>
            </div>

            <div className="pb-5">
                {styleTitle('Decision Drivers')}

                <div className="pt-1 pe-2">
                    {adr && displayDecisionDrivers(adr!.decisionDrivers)}
                </div>
            </div>

            <div className="pb-5">
                {styleTitle('Considered Options')}

                {adr && displayConsideredOptions(adr!.consideredOptions)}

                {/* mock up of a closed option */}
                <div className="border  border-l-4  border-black-500 p-2 pt-2">
                    <p className="inline font-bold"> Example collapsed option</p>
                    <p className="inline float-right w-5"> {'⌄'} </p>
                </div>
            </div>

            <div className="pb-5">
                {styleTitle('Decision Outcome')}

                {adr && displayConsideredOptions([adr!.decisionOutcome.chosenOption])}
                <br></br>
                <p className="font-bold"> Rational:</p>
                <div className="pt-2 pe-2">
                    <Markdown>{adr && adr!.decisionOutcome.rationale}</Markdown>
                </div>
            </div>

            <div className="pb-5">
                {styleTitle('Relevant Links')}
                <div className="pt-1 pe-2"> {adr && displayLinks(adr!.links)} </div>
            </div>

            <div className="italic">
                <div>
                    <p className="inline"> Created on </p>
                    {adr && getDate(adr.creationDateTime)}
                </div>
                <div>
                    <p className="inline"> Last updated on </p>
                    {adr && getDate(adr.updateDateTime)}
                </div>
            </div>
        </div>
    );

    function handleClick() {
        // edit funtionality
        console.log('editing mode');
    }

    console.log('ADR =', adrDetails);
    const content = adrDetails && adrDetails.adr ? adrView : defaultMessage;

    return (
        <div className="p-5 flex-1 overflow-auto border-l-2 border-black bg-white">{content}</div>
    );
}
