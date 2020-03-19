import { FuseNavigation } from "@fuse/types";

export const navigation: FuseNavigation[] = [
    {
        id: "applications",
        title: "Declarations",
        type: "group",
        children: [
            {
                id: "sample",
                title: "Sample",
                type: "item",
                icon: "email",
                url: "/sample"
                // badge: {
                //     title: "cralino",
                //     bg: "#F44336",
                //     fg: "#FFFFFF"
                // }
            }
        ]
    }
];
