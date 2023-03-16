let tree = {
    name: "Jean",
    isImmune: false,
    canInfect: true,
    isDead: false,
    age: 23,
    variants: ["Zombie-A"],
    children: [
        {
            name: "Sophie",
            isImmune: false,
            canInfect: true,
            isDead: false,
            age: 25,
            variants: [],
            children: [
                {
                    name: "Emma",
                    isImmune: false,
                    canInfect: true,
                    isDead: false,
                    age: 22,
                    variants: [],
                    children: [
                        {
                            name: "Quentin",
                            isImmune: false,
                            canInfect: true,
                            isDead: false,
                            age: 33,
                            variants: ["Zombie-B"],
                            children: []
                        }
                    ]
                },
                {
                    name: "Noah",
                    isImmune: false,
                    canInfect: true,
                    isDead: false,
                    age: 45,
                    variants: [],
                    children: []
                }
            ]
        },
        {
            name: "Antoine",
            isImmune: false,
            canInfect: true,
            isDead: false,
            age: 32,
            variants: ["Zombie-C"],
            children: [
                {
                    name: "Julie",
                    isImmune: false,
                    canInfect: true,
                    isDead: false,
                    age: 24,
                    variants: ["Zombie-32"],
                    children: []
                },
                {
                    name: "Pierre",
                    isImmune: false,
                    canInfect: true,
                    isDead: false,
                    age: 26,
                    variants: [],
                    children: [
                        {
                            name: "Nathalie",
                            isImmune: false,
                            canInfect: true,
                            isDead: false,
                            age: 24,
                            variants: ["Zombie-Ultime"],
                            children: []
                        }
                    ]
                }
            ]
        }
    ]
};


function infect(node, variant) {
    if (node.isDead || node.isImmune) return;
    node.variants.push(variant);
    node.canInfect = true;

    if (variant === "Zombie-A" || variant === "Zombie-32") {
        node.children.forEach(child => infect(child, variant));
    } else if (variant === "Zombie-B") {
        node.children.forEach(child => infect(child, variant));
        if (node.parent) infect(node.parent, variant);
    } else if (variant === "Zombie-C") {
        for (let i = 0; i < node.children.length; i += 2) {
            infect(node.children[i], variant);
        }
    } else if (variant === "Zombie-Ultime" && !node.parent) {
        infect(node, variant);
    }
}

function vaccinate(node, vaccine) {
    if (node.isDead) return;
    if (vaccine === "Vaccin-A.1" && (node.variants.includes("Zombie-A") || node.variants.includes("Zombie-32"))) {
        if (node.age <= 30) {
            node.isImmune = true;
            node.canInfect = false;
            node.variants = [];
        }
    } else if (vaccine === "Vaccin-B.1" && (node.variants.includes("Zombie-B") || node.variants.includes("Zombie-C"))) {
        if (Math.random() < 0.5) {
            node.isDead = true;
        } else {
            node.canInfect = false;
            node.variants = [];
        }
    } else if (vaccine === "Vaccin-Ultime" && node.variants.includes("Zombie-Ultime")) {
        node.isImmune = true;
        node.canInfect = false;
        node.variants = [];
    }

    node.children.forEach(child => vaccinate(child, vaccine));
}

// Exemple d'utilisation :
infect(tree, "Zombie-A");
vaccinate(tree, "Vaccin-A.1");

console.dir(tree, { depth: null });
