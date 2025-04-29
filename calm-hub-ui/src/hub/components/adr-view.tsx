import { useNavigate } from 'react-router-dom';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { Adr } from '../../model/calm.js';
import Markdown from 'react-markdown';
import { Option } from '../../model/adr/option.js';
import { Link } from '../../model/adr/link.js';

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
            <li key={link.rel}>
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

function getListOfConsequences(consequences: string[]) {
    let returnList = [];
    console.log('CONSEQUENCES', consequences);
    for (var i = 0; i < consequences.length; i++) {
        returnList.push(<li key={consequences[i].valueOf()}> {consequences[i].valueOf()} </li>);
    }
    return returnList;
}

function displayConsideredOptions(consideredOptions: Option[]) {
    let returnList = [];
    for (var consideredOption of consideredOptions) {
        returnList.push(
            <tr key={consideredOption.name}>
                <td className="border border-black p-1">{consideredOption.name}</td>
                <td className="border border-black p-1">{consideredOption.description}</td>
                <td className="border border-black p-1">
                    {getListOfConsequences(consideredOption.positiveConsequences)}
                </td>
                <td className="border border-black p-1">
                    {getListOfConsequences(consideredOption.negativeConsequences)}
                </td>
            </tr>
        );
    }
    return returnList;
}

export function AdrRenderer({ jsonString }: JsonRendererProps) {
    const defaultMessage = <div className="text-center">Please select an ADR to load</div>;
    // const navigate = useNavigate();
    let adr = undefined;
    console.log(jsonString);

    if (jsonString !== undefined) {
        adr = jsonString?.adr;
    }

    const jsonView = (
        <div>
            <button
                className="bg-green-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded float-right"
                onClick={handleClick}
            >
                Edit
            </button>

            <div className="font-bold inline text-3xl"> {adr && adr!.title}</div>
            <div className="inline bg-orange-500 w-15 rounded-full text-center text-xs p-1 ms-3 text-white font-bold">
                Draft
            </div>

            <div className="pt-5 pb-5">
                <p className="font-bold border-t border-b border-black"> Context and Problem</p>
                <div className="pt-1 pe-2">
                    <Markdown>{adr && adr!.contextAndProblemStatement}</Markdown>
                </div>
            </div>

            <div className="pb-5">
                <p className="font-bold border-t border-b border-black pb-1"> Decision Drivers </p>
                <div className="pt-1 pe-2">
                    {' '}
                    {adr && displayDecisionDrivers(adr!.decisionDrivers)}{' '}
                </div>
            </div>

            <div className="pb-5">
                <p className="font-bold border-t border-b border-black pb-1">Considered Options</p>
                <table className="table-fixed border border-black-500  mt-3">
                    <thead className="border border-black">
                        <tr>
                            <th className="border border-black p-1 w-60">Name</th>
                            <th className="border border-black p-1 w-60">Decision</th>
                            <th className="border border-black p-1 w-60">Positive Consequences</th>
                            <th className="border border-black p-1 w-60">Negative Consequences</th>
                        </tr>
                    </thead>
                    <tbody>{adr && displayConsideredOptions(adr!.consideredOptions)}</tbody>
                </table>
            </div>

            <div className="pb-5">
                <p className="font-bold border-t border-b border-black pb-1"> Decision Outcome </p>
                <table className="table-fixed border border-black-500  mt-3">
                    <thead className="border border-black">
                        <tr>
                            <th className="border border-black p-1 w-60">Name</th>
                            <th className="border border-black p-1 w-60">Decision</th>
                            <th className="border border-black p-1 w-60">Positive Consequences</th>
                            <th className="border border-black p-1 w-60">Negative Consequences</th>
                        </tr>
                    </thead>
                    <tbody>{adr && displayConsideredOptions(adr!.consideredOptions)}</tbody>
                </table>
                <p> Rational: </p>
                <div className="pt-2 pe-2">
                    <Markdown>{adr && adr!.decisionOutcome.rationale}</Markdown>
                </div>
            </div>

            <div className="pb-5">
                <p className="font-bold border-t border-b border-black"> Links </p>
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
        <div className="p-5 flex-1 overflow-auto border-l-4 border-black bg-white">{content}</div>
    );
}
