import pkg from "../package.json";

const sharedManifest = {
    icons: {
        16: "icons/16.png",
        19: "icons/19.png",
        32: "icons/32.png",
        38: "icons/38.png",
        48: "icons/48.png",
        64: "icons/64.png",
        96: "icons/96.png",
        128: "icons/128.png",
        256: "icons/256.png",
        512: "icons/512.png",
    },
    permissions: ["storage"],
    browser_specific_settings: {
        gecko: {
            id: "test@test.com"
        }
    }
};

const browserAction = {
    default_icon: {
        16: "icons/16.png",
        19: "icons/19.png",
        32: "icons/32.png",
        38: "icons/38.png",
    },
    default_popup: "src/entries/popup/index.html",
};

const ManifestV2 = {
    ...sharedManifest,
    browser_action: browserAction,
    permissions: [...sharedManifest.permissions, "*://*/*"],
};

const ManifestV3 = {
    ...sharedManifest,
    action: browserAction,
    host_permissions: ["*://*/*"],
};

export function getManifest(manifestVersion) {
    const manifest = {
        author: pkg.author,
        description: pkg.description,
        name: pkg.displayName ?? pkg.name,
        version: pkg.version,
    };

    if (manifestVersion === 2) {
        return {
            ...manifest,
            ...ManifestV2,
            manifest_version: manifestVersion,
        };
    }

    if (manifestVersion === 3) {
        return {
            ...manifest,
            ...ManifestV3,
            manifest_version: manifestVersion,
        };
    }

    throw new Error(
        `Missing manifest definition for manifestVersion ${manifestVersion}`
    );
}
