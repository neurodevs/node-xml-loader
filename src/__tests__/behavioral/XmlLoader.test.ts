import fs from 'fs'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import { FileLoaderOptions } from '@neurodevs/node-file-loader'
import { parseStringPromise } from 'xml2js'
import XmlLoaderImpl, { XmlLoader } from '../../XmlLoader'

export default class XmlLoaderTest extends AbstractSpruceTest {
    private static actualPath: string
    private static expectedData: any

    private static loader: XmlLoader

    protected static async beforeEach() {
        await super.beforeEach()

        this.actualPath = 'src/__tests__/testData/test.xml'
        this.expectedData = await this.loadXml(this.actualPath)

        this.loader = this.Loader()
    }

    @test()
    protected static async canCreateXmlLoader() {
        assert.isTruthy(this.loader)
    }

    @test()
    protected static async loadsXmlDataCorrectly() {
        const data = await this.load(this.actualPath)
        assert.isEqualDeep(data, this.expectedData)
    }

    private static async loadXml(path: string) {
        const xmlContent = await fs.promises.readFile(path, 'utf-8')
        return await parseStringPromise(xmlContent)
    }

    private static async load(path: string) {
        return await this.loader.load(path)
    }

    private static Loader(options?: FileLoaderOptions) {
        return XmlLoaderImpl.Create(options)
    }
}
