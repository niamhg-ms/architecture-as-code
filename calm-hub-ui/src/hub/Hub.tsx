import { useEffect, useState } from 'react';
import { ValueTable } from './components/value-table.js';
import { JsonRenderer } from './components/json-view.js';
import {
    Namespace,
    PatternID,
    FlowID,
    ArchitectureID,
    Version,
    Data,
    Revision,
    AdrID,
    Adr,
} from '../model/calm.js';
import {
    fetchNamespaces,
    fetchPatternIDs,
    fetchFlowIDs,
    fetchArchitectureIDs,
    fetchPatternVersions,
    fetchFlowVersions,
    fetchArchitectureVersions,
    fetchPattern,
    fetchFlow,
    fetchArchitecture,
} from '../service/calm-service.js';
import { fetchAdrRevisions, fetchAdrIDs, fetchAdr } from '../service/adr-service.js';
import { Navbar } from '../components/navbar/Navbar.js';
import { AdrRenderer } from './components/adr-view.js';

function Hub() {
    const [namespaces, setNamespaces] = useState<Namespace[]>([]);
    const [currentNamespace, setCurrentNamespace] = useState<Namespace | undefined>();
    const [patternIDs, setPatternIDs] = useState<PatternID[]>([]);
    const [flowIDs, setFlowIDs] = useState<FlowID[]>([]);
    const [architectureIDs, setArchitectureIDs] = useState<ArchitectureID[]>([]);
    const [adrIDs, setAdrIDs] = useState<AdrID[]>([]);
    const [currentPatternOrFlowID, setCurrentPatternOrFlowID] = useState<string | undefined>();
    const [currentVersion, setCurrentVersion] = useState<Version | undefined>();
    const [currentRevision, setCurrentRevision] = useState<Revision | undefined>();
    const [currentCalmType, setCurrentCalmType] = useState<string | undefined>();

    const [data, setData] = useState<Data | undefined>();
    const [adrData, setAdrData] = useState<Adr | undefined>();
    const [versions, setVersions] = useState<Version[]>([]);
    const [revisions, setRevisions] = useState<Revision[]>([]);

    useEffect(() => {
        fetchNamespaces(setNamespaces);
    }, []);

    const handleNamespaceSelection = (namespace: Namespace) => {
        setPatternIDs([]);
        setFlowIDs([]);
        setArchitectureIDs([]);
        setVersions([]);
        setCurrentCalmType(undefined);
        setData(undefined);
        setCurrentNamespace(namespace);
        fetchPatternIDs(namespace, setPatternIDs);
    };

    const handleCalmTypeSelection = (calmType: string) => {
        setCurrentCalmType(calmType);

        if (calmType === 'Patterns') {
            fetchPatternIDs(currentNamespace!, setPatternIDs);
            setFlowIDs([]);
            setArchitectureIDs([]);
            setAdrIDs([]);
        } else if (calmType === 'Flows') {
            fetchFlowIDs(currentNamespace!, setFlowIDs);
            setPatternIDs([]);
            setArchitectureIDs([]);
            setAdrIDs([]);
        } else if (calmType === 'Architectures') {
            fetchArchitectureIDs(currentNamespace!, setArchitectureIDs);
            setPatternIDs([]);
            setFlowIDs([]);
            setAdrIDs([]);
        } else if (calmType === 'ADRs') {
            fetchAdrIDs(currentNamespace!, setAdrIDs);
            setRevisions([]);
            setArchitectureIDs([]);
            setPatternIDs([]);
            setFlowIDs([]);
        }
        setVersions([]);
        setData(undefined);
    };

    const handlePatternOrFlowSelection = (selectedID: string) => {
        setCurrentPatternOrFlowID(selectedID);

        if (currentCalmType === 'Patterns') {
            fetchPatternVersions(currentNamespace!, selectedID, setVersions);
        } else if (currentCalmType === 'Flows') {
            fetchFlowVersions(currentNamespace!, selectedID, setVersions);
        } else if (currentCalmType === 'Architectures') {
            fetchArchitectureVersions(currentNamespace!, selectedID, setVersions);
        } else if (currentCalmType === 'ADRs') {
            fetchAdrRevisions(currentNamespace!, selectedID, setRevisions);
        }
    };

    const handleVersionSelection = (version: Version) => {
        setCurrentVersion(version);

        if (currentCalmType === 'Patterns') {
            fetchPattern(currentNamespace || '', currentPatternOrFlowID || '', version, setData);
        } else if (currentCalmType === 'Flows') {
            fetchFlow(currentNamespace || '', currentPatternOrFlowID || '', version, setData);
        } else if (currentCalmType === 'Architectures') {
            fetchArchitecture(
                currentNamespace || '',
                currentPatternOrFlowID || '',
                version,
                setData
            );
        }
    };

    const handleRevisionSelection = (revision: Revision) => {
        setCurrentRevision(revision);

        if (currentCalmType === 'ADRs') {
            fetchAdr(currentNamespace || '', currentPatternOrFlowID || '', revision, setAdrData);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-row h-[90%]">
                <div className="flex flex-row w-1/3">
                    <ValueTable
                        header="Namespaces"
                        values={namespaces}
                        callback={handleNamespaceSelection}
                        currentValue={currentNamespace}
                    />
                    {currentNamespace && (
                        <ValueTable
                            header="Calm Type"
                            values={['Architectures', 'Patterns', 'Flows', 'ADRs']}
                            callback={handleCalmTypeSelection}
                            currentValue={currentCalmType}
                        />
                    )}

                    {currentNamespace && currentCalmType && (
                        <ValueTable
                            header={
                                currentCalmType === 'Patterns'
                                    ? 'Patterns'
                                    : currentCalmType === 'Flows'
                                      ? 'Flows'
                                      : currentCalmType === 'Architectures'
                                        ? 'Architectures'
                                        : 'ADRs'
                            }
                            values={
                                currentCalmType === 'Patterns'
                                    ? patternIDs
                                    : currentCalmType === 'Flows'
                                      ? flowIDs
                                      : currentCalmType === 'Architectures'
                                        ? architectureIDs
                                        : adrIDs
                            }
                            callback={handlePatternOrFlowSelection}
                            currentValue={currentPatternOrFlowID}
                        />
                    )}

                    {currentNamespace &&
                        currentCalmType &&
                        (currentCalmType !== 'ADRs' ? (
                            <ValueTable
                                header="Versions"
                                values={versions}
                                callback={handleVersionSelection}
                                currentValue={currentVersion}
                            />
                        ) : (
                            <ValueTable
                                header="Revisions"
                                values={revisions}
                                callback={handleRevisionSelection}
                                currentValue={currentRevision}
                            />
                        ))}
                </div>
                {currentCalmType !== 'ADRs' ? (
                    <JsonRenderer jsonString={data} />
                ) : (
                    <AdrRenderer adrDetails={adrData} />
                )}
            </div>
        </>
    );
}

export default Hub;
