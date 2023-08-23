import {CancellationToken, commands, CompleteResult, ExtensionContext, FormattingOptions, LanguageClient, languages, listManager, services, sources, TextDocument, TextEdit, window, workspace} from 'coc.nvim';
//
export async function activate(context: ExtensionContext): Promise<void> {
    const config = workspace.getConfiguration('coc-qml')
    const isEnable = config.get<boolean>('enabled', true)
    if (!isEnable) {
        return
    }

    var qmlformat = config.get<string>('qmlformatPath', 'qmlformat')
    var qmlformatArgs = config.get<string[]>('qmlformatArgs', [])

    commands.registerCommand('coc-qml.formatDocument', async () => {
        await format(qmlformat, qmlformatArgs)
    });

    commands.registerCommand('coc-qml.qmlformat', async () => {
        await format(qmlformat, qmlformatArgs)
    });

    // register Actions


    var qmlls = config.get<string>('qmllsPath', 'qmlls')
    var qmllsArgs = config.get<string[]>('qmllsArgs', [])

    const serverOptions = {
        command: qmlls, // run qmlls
        args: qmllsArgs,
        languages: ['qml'],
    }
    const clientOptions = {
        documentSelector: ['qml'], // run qmlls on qml files
    }
    // 'coc-qml', // the id
    const client = new LanguageClient(
        'coc-qml', // the name of the language server
        serverOptions,
        clientOptions,
        true
    )
    context.subscriptions.push(services.registLanguageClient(client))

}



async function format(qmlformat: string, qmlformatArgs: string[]) {
    const doc = await workspace.document
    if (doc && doc.filetype == 'qml') {
        // save workspace.document
        await workspace.nvim.command('w')
        // const cmd = `qmlformat -i ${doc.uri.toString().replace('file://', '')}`
        const cmd = `${qmlformat} -i ${doc.uri.toString().replace('file://', '')} ${qmlformatArgs.join(' ')}`
        // run cmd
        const res = await workspace.runCommand(cmd)
        await workspace.nvim.command('e')
        if (res.length > 0) {
            window.showMessage(res)
        }
        // if (res) {
        //     window.showMessage(`coc-qml format success!`);
        // }
    }
}

