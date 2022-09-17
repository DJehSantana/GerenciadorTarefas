module.exports = (req, res, next) => {
    //número aleatório gerado pelo método ramdom da classe Math
    //a classe Math é a classe que trabalha operações matemáticas no Javascript
    const traceId = Math.random() * 99999;
    const logger = {
        // exibe mensagens de erro
        error: (mensagem, ...parametrosExtras) => {
            console.error(`[ERROR] traceId = ${traceId}, mensagem = ${mensagem}`, ...parametrosExtras);
        },
        // exibe mensagens de depuração
        debug: (mensagem, ...parametrosExtras) => {
            console.log(`[DEBUG] traceId = ${traceId}, mensagem = ${mensagem}`, ...parametrosExtras);
        },
        // exibe mensagens informativas
        info: (mensagem, ...parametrosExtras) => {
            console.info(`[INFO] traceId = ${traceId}, mensagem = ${mensagem}`, ...parametrosExtras);
        }
        // o ...paramentrosExtras está sendo usado como um coringa para receber parametros extras
        //usado quando não se sabe a quantidade exata de parâmetros que será recebidos na função
    }
    logger.info( `requisição recebida!,
    URl: ${req.url},
    Method_HTTP: ${req.method}`);

    //cria uma propriedade logger no objeto da requisição (req) e atribui o objeto logger criado
    req.logger = logger;
    //chamando o método next
    next();
}