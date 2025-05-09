import { describe, expect, it } from 'vitest';
import { adrStatus, displayAdrStatus } from '../model/adr/adr-status.js';

describe('ADR Status', () => {
    it('should return Draft with an orange background if ADR status is draft', () => {
        let status = adrStatus.draft;
        expect(status.toString() === 'Draft');
        expect(displayAdrStatus(status).props.className).toContain('bg-orange-500');
    });

    it('should return Proposed with a teal background if ADR status is proposed', () => {
        let status = adrStatus.proposed;
        expect(status.toString() === 'Proposed');
        expect(displayAdrStatus(status).props.className).toContain('bg-teal-500');
    });

    it('should return Accepted with a lime background if ADR status is accepted', () => {
        let status = adrStatus.accepted;
        expect(status.toString() === 'Accepted');
        expect(displayAdrStatus(status).props.className).toContain('bg-lime-500');
    });

    it('should return Superseded with a violet background if ADR status is superseded', () => {
        let status = adrStatus.superseded;
        expect(status.toString() === 'Superseded');
        expect(displayAdrStatus(status).props.className).toContain('bg-violet-500');
    });

    it('should return Rejected with a red background if ADR status is rejected', () => {
        let status = adrStatus.rejected;
        expect(status.toString() === 'Rejected');
        expect(displayAdrStatus(status).props.className).toContain('bg-red-500');
    });

    it('should return Deprecated with a slate background if ADR status is deprecated', () => {
        let status = adrStatus.deprecated;
        expect(status.toString() === 'Deprecated');
        expect(displayAdrStatus(status).props.className).toContain('bg-slate-500');
    });
});
