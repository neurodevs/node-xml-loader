import fs from 'fs'
import {
    AbstractFileLoader,
    FileLoader,
    FileLoaderOptions,
} from '@neurodevs/node-file-loader'
import { parseStringPromise } from 'xml2js'

export default class XmlLoaderImpl extends AbstractFileLoader<ParsedXml> {
    public static Class?: XmlLoaderConstructor

    public static Create(options?: FileLoaderOptions) {
        return new (this.Class || this)(options)
    }

    protected fileExtension = '.xml'

    protected async loadFile() {
        return this.loadXml()
    }

    private async loadXml() {
        const content = await fs.promises.readFile(this.path, 'utf-8')
        return await parseStringPromise(content)
    }
}

export type XmlLoader = FileLoader<ParsedXml>

export type XmlLoaderConstructor = new (
    options?: FileLoaderOptions
) => XmlLoader

export type ParsedXml = Record<string, unknown>
