import { Option } from '../model/adr/option.js';
import { Link } from '../model/adr/link.js';
import Markdown from 'react-markdown';
import './marker.css';

export function styleTitle(title: string) {
    return <p className="font-bold border-b border-blue-200 text-lg text-blue-500"> {title} </p>;
}

export function getDate(date: string) {
    let newDate = new Date(date);

    return (
        <div className="font-bold inline">
            {newDate.getDate()} {newDate.toLocaleString('default', { month: 'short' })},{' '}
            {newDate.getFullYear()} <p className="inline font-normal">at</p> {newDate.getHours()}:
            {newDate.getMinutes()}
        </div>
    );
}
export function displayLinks(links: Link[]) {
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

export function displayDecisionDrivers(drivers: string[]) {
    let returnList = [];
    for (var driver of drivers) {
        returnList.push(<li key={driver}>{driver}</li>);
    }
    return returnList;
}

function getListOfConsequences(consequences: string[], positive: boolean) {
    let returnList = [];
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

export function displayConsideredOptions(consideredOptions: Option[]) {
    let returnList = [];
    for (var consideredOption of consideredOptions) {
        returnList.push(
            <div className="pt-2">
                <div className="border border-l-4 border-black-500 p-2">
                    <p className="inline font-bold">{consideredOption.name}</p>
                    <p className="inline float-right w-5"> {'^'} </p>
                </div>
                <div className="border border-black-500 ps-2 pb-2">
                    <div className="pt-1 pe-2">
                        <Markdown>{consideredOption.description}</Markdown>
                    </div>
                    <br></br>
                    <p> Positive Consequences:</p>
                    {getListOfConsequences(consideredOption.positiveConsequences, true)}
                    <br></br>
                    <p> Negative Consequences:</p>
                    {getListOfConsequences(consideredOption.negativeConsequences, false)}
                </div>
                <br></br>
            </div>
        );
    }
    return returnList;
}
