declare const ruleHelpers: any;
declare const htmlHelpers: any;
interface IPmpPlugin {
    name: string;
    description: string;
    ruleHelperObjectName: string;
    ruleHelpers: any;
    htmlHelpers: any;
}
declare let plugin: IPmpPlugin;
