module.exports = (req, res, next) => {
    //número aleatório gerado pelo método ramdom da classe Math
    //a classe Math é a classe que trabalha operações matemáticas no Javascript
    const traceId = Math.random();
    const logger = {
        // exibe mensagens de erro
        error: (mensagem, ...parametrosExtras) => {
            console.error(`traceId = ${traceID}, mensagem = ${mensagem}`, ...parametrosExtras);
        },
        // exibe mensagens de depuração
        debug: (mensagem, ...parametrosExtras) => {
            console.log(`traceId = ${traceId}, mensagem = ${mensagem}`, ...parametrosExtras);
        },
        // exibe mensagens informativas
        info: (mensagem, ...parametrosExtras) => {
            console.info(`traceId = ${traceId}, mensagem = ${mensagem}`, ...parametrosExtras);
        }
        // o ...paramentrosExtras está sendo usado como um coringa para receber parametros extras
        //usado quando não se sabe a quantidade exata de parâmetros que será recebidos na função
    }
    logger.info( `requisição recebida!,
    URl: ${req.url},
    Method_HTTP: ${req.method}`)
    next();
}