"use client";

import React, { createContext, useContext } from "react";

const ToolContext = createContext({ hideHeader: false });

export const useToolContext = () => useContext(ToolContext);

export const ToolContextProvider = ({
    children,
    value,
}: {
    children: React.ReactNode;
    value: { hideHeader: boolean };
}) => {
    return (
        <ToolContext.Provider value={value}>
            {children}
        </ToolContext.Provider>
    );
};
