export enum adrStatus {
    draft = 'draft',
    proposed = 'proposed',
    accepted = 'accepted',
    superseded = 'superseded',
    rejected = 'rejected',
    deprecated = 'deprecated',
}

export function displayAdrStatus(adrStatus: adrStatus) {
    let adrStatusStyling =
        'inline rounded-full text-center text-s ps-3 pe-3 ms-3 mb-0 text-white font-bold';
    let adrStatusString = adrStatus.charAt(0).toUpperCase() + adrStatus.slice(1);

    switch (adrStatus) {
        case 'draft': {
            adrStatusStyling = adrStatusStyling + ' bg-orange-500';
            break;
        }
        case 'proposed': {
            adrStatusStyling = adrStatusStyling + ' bg-teal-500';
            break;
        }
        case 'accepted': {
            adrStatusStyling = adrStatusStyling + ' bg-lime-500';
            break;
        }
        case 'superseded': {
            adrStatusStyling = adrStatusStyling + ' bg-violet-500';
            break;
        }
        case 'rejected': {
            adrStatusStyling = adrStatusStyling + ' bg-red-500';
            break;
        }
        case 'deprecated': {
            adrStatusStyling = adrStatusStyling + ' bg-slate-500';
        }
    }

    return <div className={adrStatusStyling}>{adrStatusString}</div>;
}
