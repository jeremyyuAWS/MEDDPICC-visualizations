import React from 'react';
import { EnrichmentTag } from '../../types';
import { TAG_COLORS } from '../../constants/meddpiccData';
import { Tag, Server, Database } from 'lucide-react';

interface EnrichmentTagsProps {
  cloudProvider?: string;
  tags: EnrichmentTag[];
}

const EnrichmentTags: React.FC<EnrichmentTagsProps> = ({ cloudProvider, tags }) => {
  const getTagIcon = (type: string) => {
    switch (type) {
      case 'cloud':
        return <Server className="h-3 w-3" />;
      case 'tech':
        return <Database className="h-3 w-3" />;
      default:
        return <Tag className="h-3 w-3" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Tag className="h-5 w-5 text-gray-700 mr-2" />
        <h2 className="text-xl font-semibold">Data Enrichment</h2>
      </div>
      
      {cloudProvider && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Cloud Provider</h3>
          <div className="flex">
            <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${TAG_COLORS.cloud}`}>
              <Server className="h-3 w-3 mr-1" />
              {cloudProvider}
            </span>
          </div>
        </div>
      )}
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Technology & Compliance</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag.id} 
              className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${TAG_COLORS[tag.type]}`}
            >
              {getTagIcon(tag.type)}
              <span className="ml-1">{tag.value}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrichmentTags;