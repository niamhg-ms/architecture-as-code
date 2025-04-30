import { useNavigate } from 'react-router-dom';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { Adr } from '../../model/calm.js';
import Markdown from 'react-markdown';
import { Option } from '../../model/adr/option.js';
import { Link } from '../../model/adr/link.js';
import './marker.css';

interface JsonRendererProps {
    jsonString: Adr | undefined;
}

function getDate(date: string) {
    let newDate = new Date(date);

    return (
        <div className="inline">
            {newDate.getDate()} {newDate.toLocaleString('default', { month: 'short' })},{' '}
            {newDate.getFullYear()} <p className="inline font-normal">at</p> {newDate.getHours()}:
            {newDate.getMinutes()}
        </div>
    );
}
function displayLinks(links: Link[]) {
    let returnList = [];
    for (var link of links) {
        returnList.push(
            <li key={link.rel} className="list-row">
                <a href={link.href} rel={link.rel} target="_blank" className="underline">
                    {link.rel}
                </a>
            </li>
        );
    }
    return returnList;
}

function displayDecisionDrivers(drivers: string[]) {
    let returnList = [];
    for (var driver of drivers) {
        returnList.push(<li key={driver}>{driver}</li>);
    }
    return returnList;
}

function getListOfConsequences(consequences: string[], positive: boolean) {
    let returnList = [];
    console.log('CONSEQUENCES', consequences);
    let bulletStyling = 'ps-4 marker-negative list-none';
    if (positive) {
        bulletStyling = 'ps-4 marker-positive list-none';
    }
    for (var i = 0; i < consequences.length; i++) {
        returnList.push(
            <li key={consequences[i].valueOf()} className={bulletStyling}>
                {consequences[i].valueOf()}
            </li>
        );
    }
    return returnList;
}

function displayConsideredOptions(consideredOptions: Option[]) {
    let returnList = [];
    for (var consideredOption of consideredOptions) {
        returnList.push(
            <div className="pt-1">
                <div>
                    <p className="inline font-bold">
                        {consideredOption.name} {'>'} (daisy ui collabsible?)
                    </p>
                </div>
                <div className="ps-2">
                    <p> {consideredOption.description} </p>
                    <br></br>
                    <p> Positive Consequences:</p>
                    {getListOfConsequences(consideredOption.positiveConsequences, true)}
                    <br></br>
                    <p> Negative Consequences:</p>
                    {getListOfConsequences(consideredOption.negativeConsequences, false)}
                </div>
            </div>
        );
    }
    return returnList;
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
            </div>

            <div className="pb-5">
                <p className="font-bold border-b border-blue-200 text-lg text-blue-500">
                    Decision Outcome
                </p>
                {adr && displayConsideredOptions([adr!.decisionOutcome.chosenOption])}
                <br></br>
                <p> Rational: (prettify) </p>
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
