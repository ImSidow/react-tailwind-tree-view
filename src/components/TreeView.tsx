import { useState } from 'react';
import { FolderPlusIcon, FolderMinusIcon, DocumentIcon } from '@heroicons/react/24/solid';
import React from 'react';

export type TreeViewDataType<T> = {
    id: number;
    label: string;
    position: 'parent' | 'child';
    children?: TreeViewDataType<T>[];
    values?: T;
};

type ListCommonProps = {
    data: TreeViewDataType<any>;
    renderLabel?: (param: { item: TreeViewDataType<any>; isActive: boolean }) => React.ReactNode;
};

type TreeViewProps<T> = {
    data: TreeViewDataType<T>[];
    parentCollapsedIcon?: React.ReactNode;
    parentExpandedIcon?: React.ReactNode;
    childIcon?: React.ReactNode;
    renderLabel?: (param: { item: TreeViewDataType<T>; isActive: boolean }) => React.ReactNode;
};

const TreeView = <T,>({ data, parentCollapsedIcon, parentExpandedIcon, childIcon, renderLabel }: TreeViewProps<T>) => {
    const renderBaseOnPosition = (data: TreeViewDataType<T>) => {
        if (data.position === 'parent') {
            return (
                <ParentList
                    key={data.id}
                    collapsedIcon={!parentCollapsedIcon && <FolderPlusIcon className="w-5 h-5 text-gray-700" />}
                    expandedIcon={!parentExpandedIcon && <FolderMinusIcon className="w-5 h-5 text-gray-700" />}
                    data={data}
                    renderLabel={renderLabel}
                    children={data?.children && renderList(data.children)}
                />
            );
        }
        return <ChildList key={data.id} icon={!childIcon && <DocumentIcon className="w-5 h-5 text-gray-700" />} data={data} renderLabel={renderLabel} />;
    };

    // render data using recursion
    const renderList = (data: TreeViewDataType<T>[]) => {
        return data.map((value) => renderBaseOnPosition(value));
    };

    return <div>{renderList(data)}</div>;
};

// parent  UI
type ParentListProps = {
    collapsedIcon: React.ReactNode;
    expandedIcon: React.ReactNode;
    children?: React.ReactNode | React.ReactNode[];
} & ListCommonProps;
const ParentList: React.FC<ParentListProps> = ({ collapsedIcon, expandedIcon, data, renderLabel, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 px-2 py-1 bg-gray-100 rounded mb-1">
                {isOpen ? expandedIcon : collapsedIcon}
                <div className="w-full">{renderLabel ? renderLabel({ item: data, isActive: isOpen }) : data.label}</div>
            </div>
            {isOpen && <div className="pl-5">{children}</div>}
        </div>
    );
};

// child  UI
type ChildListProps = {
    icon: React.ReactNode;
} & ListCommonProps;
const ChildList: React.FC<ChildListProps> = ({ icon, renderLabel, data }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 px-2 py-1 bg-gray-100 rounded mb-1">
            {icon}
            <div className="w-full">{renderLabel ? renderLabel({ item: data, isActive: isOpen }) : data.label}</div>
        </div>
    );
};

export default React.memo(TreeView) as typeof TreeView;
