import { Decision } from "./decision.js";
import { Option } from "./option.js";

export interface Adr {
    title: string;
    status: 'draft' | 'proposed' | 'accepted' | 'superseded' | 'rejected' | 'deprecated';
    creationDateTime: Date;
    updatedDateTime: Date;
    contextAndProblemStatement: string;
    decisionDrivers: string[];
    consideredOptions: Option[];
    decisionOutcome: Decision;
    links: string[];
}