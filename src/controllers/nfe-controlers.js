const NfeIntegration = require('../models/nfeIntegration');

const certificadoDigital = 'teste01'; // Caminho do certificado digital
const cnpj = '12345678000195'; // CNPJ do emitente

const nfeIntegration = new NfeIntegration(certificadoDigital, cnpj, 'homologacao');

// Função para emitir a NF-e
const emitirNfe = async (req, res) => {
  try {
    const nfeData = req.body;
    const validacao = await nfeIntegration.validarNfe(nfeData);
    if (!validacao.valido) {
      return res.status(400).json({ erros: validacao.erros });
    }

    const respostaSefaz = await nfeIntegration.emitirNfe(nfeData);
    res.status(200).json(respostaSefaz);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao emitir NF-e', details: error.message });
  }
};

// Função para consultar o status da NF-e
const consultarNfe = async (req, res) => {
  try {
    const chaveNfe = req.params.chave;
    const resultadoConsulta = await nfeIntegration.consultarNfe(chaveNfe);
    res.status(200).json(resultadoConsulta);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar NF-e', details: error.message });
  }
};

module.exports = { emitirNfe, consultarNfe };
