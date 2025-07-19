import React, { type LazyExoticComponent } from "react";

type ImportStatement = () => Promise<{ default: React.ComponentType<any> }>;

export interface LazyComponent
  extends LazyExoticComponent<React.ComponentType<any>> {
  preload: ImportStatement;
}

export const ReactLazyPreload = (
  importStatement: ImportStatement,
): LazyComponent => {
  const Component = React.lazy(importStatement) as LazyComponent;
  Component.preload = importStatement;
  return Component;
};
