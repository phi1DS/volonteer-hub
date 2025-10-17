import React from 'react';
import { Head } from '@inertiajs/react';

interface AboutProps {
  title: string;
  description: string;
}

export default function About({ title, description}: AboutProps) {
    return (
        <div className="p-6">
            <Head title={title} />
            <h1 className="text-2x1 font-bold mb-4">{title}</h1>
            <p>{description}</p>
        </div>
    );
}
