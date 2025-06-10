import { render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { JsonRenderer } from './JsonRenderer.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('JsonRenderer', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
        mockNavigate.mockClear();
    });

    it('renders default message when jsonString is undefined', () => {
        render(
            <MemoryRouter>
                <JsonRenderer json={undefined} />
            </MemoryRouter>
        );
        expect(screen.getByText(/please select a document to load/i)).toBeInTheDocument();
        expect(screen.queryByText(/visualize/i)).not.toBeInTheDocument();
    });

    it('renders JsonView when jsonString is provided', () => {
        const data = {
            id: '42',
            version: '0.0.1',
            name: 'bar',
            calmType: 'Architectures',
            data: undefined,
        };
        render(
            <MemoryRouter>
                <JsonRenderer json={data} />
            </MemoryRouter>
        );
        expect(screen.getByText(/name/i)).toBeInTheDocument();
        expect(screen.getByText(/bar/i)).toBeInTheDocument();
        expect(screen.getByText(/data/i)).toBeInTheDocument();
        expect(screen.getByText(/undefined/i)).toBeInTheDocument();
    });
});