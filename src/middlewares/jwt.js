module.exports = (req, res, next) => {
    req.logger.info('Verificando permissão de acesso a rota', `rota = ${req.url}`);
}