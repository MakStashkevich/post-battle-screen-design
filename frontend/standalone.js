/**
 * Author: Maksim Stashkevich
 * Email: makstashkevich@gmail.com
 * Website: https://makstashkevich.com
 */

const fs = require("fs");

const modulesDir = './node_modules';
const standaloneModulesDir = './.standalone/node_modules';

const requireModules = ['express', 'cors']

function dirPackageModule(name) {
    return modulesDir + "/" + name;
}

function pathPackageFile(path) {
    return path + '/package.json';
}

function parsePackageData(name) {
    const dirPath = dirPackageModule(name);
    const packagePath = pathPackageFile(dirPath);
    if (!fs.existsSync(dirPath) || !fs.existsSync(packagePath)) {
        return false
    }
    let packageData, dependenciesList = null;
    const data = fs.readFileSync(packagePath, {encoding: 'utf-8'});
    try {
        packageData = JSON.parse(data);
        dependenciesList = packageData.dependencies;
    } catch (e) {
        console.error(e);
        return false
    }
    // copy currentPlayer module
    copyPackageModule(name);
    if (!dependenciesList) {
        return true
    }
    // copy dependencies modules
    Object.keys(dependenciesList).forEach(function (name) {
        parsePackageData(name);
    });
    return true
}

function copyPackageModule(name) {
    const dirPath = dirPackageModule(name);
    const packagePath = pathPackageFile(dirPath);
    if (!fs.existsSync(dirPath) || !fs.existsSync(packagePath)) {
        return false
    }
    try {
        const destPath = standaloneModulesDir + '/' + name;
        if (!fs.existsSync(destPath)) {
            fs.cpSync(dirPath, destPath, {recursive: true});
        }
    } catch (e) {
        console.error(e)
        return false
    }
    return true
}

fs.rmSync(standaloneModulesDir, {recursive: true, force: true});
requireModules.forEach(name => parsePackageData(name));
console.log('Standalone node_modules successful prepared.');