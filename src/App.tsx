import TreeView, { TreeViewDataType } from './components/TreeView';

const accounts: TreeViewDataType<{ balance: number }>[] = [
    {
        id: 1,
        label: 'Assets',
        position: 'parent',
        children: [
            {
                id: 6,
                position: 'parent',
                label: 'Current Assets',
                children: [
                    {
                        id: 9,
                        position: 'parent',
                        label: 'Cash',
                        children: [
                            {
                                id: 12,
                                position: 'child',
                                label: 'Cash in Hand',
                                values: {
                                    balance: 872,
                                },
                            },
                            {
                                id: 13,
                                position: 'child',
                                label: 'Cash in Bank',
                                values: {
                                    balance: 233,
                                },
                            },
                        ],
                    },
                    {
                        id: 10,
                        position: 'parent',
                        label: 'Bank',
                        values: {
                            balance: 0,
                        },
                    },
                    {
                        id: 11,
                        position: 'parent',
                        label: 'Accounts Receivable',
                        values: {
                            balance: 0,
                        },
                    },
                ],
            },
            {
                id: 7,
                position: 'parent',
                label: 'Fixed Assets',
                values: {
                    balance: 0,
                },
            },
            {
                id: 8,
                position: 'parent',
                label: 'Other Assets',
                values: {
                    balance: 0,
                },
            },
        ],
        values: {
            balance: 0,
        },
    },
    {
        id: 2,
        position: 'parent',
        label: 'Liabilities',
        values: {
            balance: 0,
        },
    },
    {
        id: 3,
        position: 'parent',
        label: 'Equity',
        values: {
            balance: 0,
        },
    },
    {
        id: 4,
        position: 'parent',
        label: 'Revenue',
        values: {
            balance: 0,
        },
    },
    {
        id: 5,
        position: 'parent',
        label: 'Expenses',
        values: {
            balance: 0,
        },
    },
];

// const style

function App() {
    return (
        <div className="h-screen flex justify-center pt-10">
            <div className="w-3/6">
                <TreeView
                    data={accounts}
                    renderLabel={({ item, isActive }) => (
                        <div className="flex justify-between">
                            <div> {item.label}</div>
                            {isActive && (
                                <div className="flex">
                                    <div className="border-l border-y border-gray-300 px-2">Edit</div>
                                    <div className="border-l border-y border-gray-300 px-2">Delete</div>
                                    <div className="border border-gray-300 px-2">Add Child</div>
                                </div>
                            )}
                            <div>${item.values?.balance}</div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export default App;
