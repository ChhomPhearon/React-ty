
'use client';
import { Card } from 'flowbite-react';
import { Products } from './HomeComponet'


export default function CardComponent({title, description, image}: Products) {
  return (
    <Card
      className="max-w-sm"
      renderImage={() => <img width={500} height={500} src={image}/>}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </Card>
  );
}
