# coc-qml

This extension connects [coc.nvim](https://github.com/neoclide/coc.nvim) to the qml language server.

## Requirements

[coc.nvim](https://github.com/neoclide/coc.nvim) 

Qt version >= 6.4


## support

* highlighting
* indentation
* completions
* coding errors/hints

## Install

add path\to\qtdir\bin to path

`:CocInstall coc-qml`


or put the following in your vimrc:

`Plug 'Jinlixian/coc-qml', {'do': 'yarn install --frozen-lockfile && yarn build'}`

And run:

`:PlugInstall`


## License

MIT


