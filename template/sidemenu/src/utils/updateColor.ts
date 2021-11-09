const version = require("element-ui/package.json").version; // element-ui version from node_modules
const ORIGINAL_THEME = "#409EFF"; // default color
const setting = { chalk: '' };
export const updateColor = async (value: string) => {
    if (!value) return;

    const oldValue = ORIGINAL_THEME;
    const themeCluster = getThemeCluster(value.replace("#", ""));
    const originalCluster = getThemeCluster(oldValue.replace("#", ""));
    document.body.style.setProperty('--theme-color', value);
    document.body.style.setProperty('--theme-color-tint', tintColor(value.replace("#", ""), .9));
    document.body.style.setProperty('--theme-color-shade', shadeColor(value.replace("#", ""), .1));
    if (!setting.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
        await getCSSString(url, "chalk");
    }

    const getHandler = (variable: string, id: string) => {
        return () => {
            const originalCluster = getThemeCluster(
                ORIGINAL_THEME.replace("#", "")
            );
            const newStyle = updateStyle(
                (setting as any)[variable],
                originalCluster,
                themeCluster
            );

            let styleTag = document.getElementById(id);
            if (!styleTag) {
                styleTag = document.createElement("style");
                styleTag.setAttribute("id", id);
                document.head.appendChild(styleTag);
            }
            styleTag.innerText = newStyle;
        };
    };
    const chalkHandler = getHandler("chalk", "chalk-style");
    chalkHandler();

    let styles: HTMLElement[] = [].slice.call(
        document.querySelectorAll("style")
    );
    styles = styles.filter((style) => {
        const text = style.innerText;
        return (
            new RegExp(oldValue, "i").test(text) && !/Chalk Variables/.test(text)
        );
    });
    styles.forEach((style) => {
        const { innerText } = style;
        if (typeof innerText !== "string") return;
        style.innerText = updateStyle(
            innerText,
            originalCluster,
            themeCluster
        );
    });
}

const updateStyle = (
    style: string,
    oldCluster: string[],
    newCluster: string[]
) => {
    let newStyle = style;
    oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
    });
    return newStyle;
}

const getCSSString = (url: string, variable: string) => {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                (setting as any)[variable] = xhr.responseText.replace(
                    /@font-face{[^}]+}/,
                    ""
                );
                resolve(null);
            }
        };
        xhr.open("GET", url);
        xhr.send();
    });
}

const getThemeCluster = (theme: string) => {

    const clusters = [theme];
    for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }
    clusters.push(shadeColor(theme, 0.1));
    return clusters;
}
const tintColor = (color: string, tint: number) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);
    if (tint === 0) {
        // when primary color is in its rgb space
        return [red, green, blue].join(",");
    } else {
        red += Math.round(tint * (255 - red));
        green += Math.round(tint * (255 - green));
        blue += Math.round(tint * (255 - blue));
        return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
    }
};

const shadeColor = (color: string, shade: number) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);
    red = Math.round((1 - shade) * red);
    green = Math.round((1 - shade) * green);
    blue = Math.round((1 - shade) * blue);
    return `#${(red < 10 ? ('0' + red) : red).toString(16)}${(green < 10 ? ('0' + green) : green).toString(16)}${(blue < 10 ? ('0' + blue) : blue).toString(16)}`;
};