

export default {
    pages: [
    {
        name: "home",
        path: "/",
        component: require('@mapstore/product/pages/Maps').default
    },    
    {
        name: "map",
        path: "/home",
        component: require('./Wurth').default
    },
    {
        name: 'mapstore-home',
        path: 'home-1',
        component: require('./pages/MapStoreHome').default
    },
    {
        name: "map",
        path: "/viewer/:mapType/:mapId",
        component: require('./Wurth').default
    },
    {
        name: 'context',
        path: "/context/:contextName",
        component: require('@mapstore/product/pages/Context').default
    },
    {
        name: 'context',
        path: "/context/:contextName/:mapId",
        component: require('@mapstore/product/pages/Context').default
    },
    {
        name: 'context-creator',
        path: "/context-creator/:contextId",
        component: require('@mapstore/product/pages/ContextCreator').default
    },
    {
        name: "manager",
        path: "/manager",
        component: require('@mapstore/product/pages/Manager').default
    },
    {
        name: "manager",
        path: "/manager/:tool",
        component: require('@mapstore/product/pages/Manager').default
    },
    {
        name: "context-manager",
        path: "/context-manager",
        component: require('@mapstore/product/pages/ContextManager').default
    },
    {
        name: "rulesmanager",
        path: "/rules-manager",
        component: require('@mapstore/product/pages/RulesManager').default
    },
    {
        name: "dashboard",
        path: "/dashboard",
        component: require('@mapstore/product/pages/Dashboard').default
    },
    {
        name: "dashboard",
        path: "/dashboard/:did",
        component: require('@mapstore/product/pages/Dashboard').default
    },
    {
        name: "geostory",
        path: "/geostory/:gid",
        component: require('@mapstore/product/pages/GeoStory').default
    },
    {
        name: "geostory",
        path: "/geostory/:gid/section/:sectionId",
        component: require('@mapstore/product/pages/GeoStory').default
    }, {
        name: "geostory",
        path: "/geostory/:gid/section/:sectionId/column/:columnId",
        component: require('@mapstore/product/pages/GeoStory').default
    }, {
        name: "geostory",
        path: "/geostory/shared/:gid",
        component: require('@mapstore/product/pages/GeoStory').default
    },
    {
        name: "geostory",
        path: "/geostory/shared/:gid/section/:sectionId",
        component: require('@mapstore/product/pages/GeoStory').default
    },
    {
        name: "geostory",
        path: "/geostory/shared/:gid/section/:sectionId/column/:columnId",
        component: require('@mapstore/product/pages/GeoStory').default
    }
  ],
};
