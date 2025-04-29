import { useNavigate } from 'react-router-dom';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { Adr, Data } from '../../model/calm.js';
import Markdown from 'react-markdown';
import { AdrMeta } from '../../model/adr/adr.meta.js';
import { Option } from '../../model/adr/option.js';

interface JsonRendererProps {
    jsonString: Adr | undefined;
}

function displayLinks(links: string[]) {
    let returnList = [];
    for (var link of links) {
        returnList.push(
            <li>
                <a href={link} target="_blank" className="underline">
                    {link}
                </a>
            </li>
        );
    }
    return returnList;
}

function getListOfConsequences(consequences: string[]) {
    let returnList = [];
    for (var consequence in consequences) {
        returnList.push(<li> {consequence} </li>);
    }
    return returnList;
}

function displayConsideredOptions(consideredOptions: Option[]) {
    let returnList = [];
    for (var consideredOption of consideredOptions) {
        returnList.push(
            <tr>
                <td className="border border-black">{consideredOption.name}</td>
                <td className="border border-black">{consideredOption.description}</td>
                <td className="border border-black">
                    {getListOfConsequences(consideredOption.positiveConsequences)}
                </td>
                <td className="border border-black">
                    {getListOfConsequences(consideredOption.positiveConsequences)}
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
        adr = jsonString!.adr;
    }
    const jsonView = (
        <div>
            <button
                className="bg-green-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded float-right"
                onClick={handleClick}
            >
                Edit
            </button>

            <div className="font-bold inline text-3xl"> {adr!.title}</div>
            <div className="inline bg-orange-500 w-15 rounded-full text-center text-xs p-1 ms-3 text-white font-bold">
                Draft
            </div>

            <div className="pt-5 pb-5">
                <p className="font-bold border-t border-b border-black"> Context and Problem</p>
                <div className="pt-1 pe-2">
                    <Markdown>{adr!.contextAndProblemStatement}</Markdown>
                </div>
            </div>

            <div className="pb-5">
                <p className="font-bold border-t border-b border-black"> Decision Drivers </p>
                <p className="pt-1 pe-2"> list </p>
            </div>

            <div className="pb-5">
                <p className="font-bold border-t border-b border-black">Considered Options</p>
                <p className="pt-1 pe-2"> list </p>
                <table className="table-fixed border border-black-500">
                    <thead className="border border-black">
                        <tr>
                            <th>Name</th>
                            <th>Decision</th>
                            <th>Positive Consequences</th>
                            <th>Negative Consequences</th>
                        </tr>
                    </thead>
                    <tbody> {displayConsideredOptions(adr!.consideredOptions)}</tbody>
                </table>
            </div>

            <div className="pb-5">
                <p className="font-bold border-t border-b border-black"> Decision Outcome </p>
                <table className="table-fixed border border-black-500">
                    <thead className="border border-black">
                        <tr>
                            <th>Name</th>
                            <th>Decision</th>
                            <th>Positive Consequences</th>
                            <th>Negative Consequences</th>
                        </tr>
                    </thead>
                    <tbody> {displayConsideredOptions(adr!.consideredOptions)}</tbody>
                </table>
                <p> Rational: </p>
                <div className="pt-1 pe-2">
                    <Markdown>{adr!.decisionOutcome.rationale}</Markdown>
                </div>
            </div>

            <div className="pb-5">
                <p className="font-bold border-t border-b border-black"> Links </p>
                <div className="pt-1 pe-2"> {displayLinks(adr!.links)} </div>
            </div>

            <div className="italic">
                <p>
                    Created on <p className="font-bold inline">9 Jun 2002</p> by{' '}
                    <p className="font-bold inline">Niamh Gillespie</p>{' '}
                </p>
                <p>
                    Last updated on <p className="font-bold inline">29 Apr 2025</p> by{' '}
                    <p className="font-bold inline">Niamh Gillespie</p>{' '}
                </p>
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
