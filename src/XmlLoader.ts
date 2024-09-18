import fs from 'fs'
import {
    AbstractFileLoader,
    FileLoader,
    FileLoaderOptions,
} from '@neurodevs/node-file-loader'
import { parseStringPromise } from 'xml2js'

export default class XmlLoaderImpl<
    FileContent = ParsedXml,
> extends AbstractFileLoader<FileContent> {
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
        const result = await parseStringPromise(content)
        return result as FileContent
    }
}

export type XmlLoader<FileContent = ParsedXml> = FileLoader<FileContent>

export type XmlLoaderConstructor<FileContent = ParsedXml> = new (
    options?: FileLoaderOptions
) => XmlLoader<FileContent>

export type ParsedXml = Record<string, unknown>
