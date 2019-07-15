'use strict';

const logger = require('../server-lib/logger');
const express = require('express');
const send_response = require('../server-lib/send_response');

const prepareConTx = require('../controllers/prepareConTx');

module.exports = (reqId, logRequest) => {
    var router = express.Router();
    router.post('/prepareConTx', reqId, logRequest, function(req, res) {
        const prelog = `[prepareConTx] (${req.logPrfx})`;
        let params;
        let wallet;

        return prepareConTx.validateData(req.body)
            .then(data => {
                wallet = data.wallet;
                params = data.params;
                // combine parameters and sign them
                const hexParams = prepareConTx.hexParams(params);
                logger.log(`${prelog} combining into text2sign hex string:`);
                logger.log(`${prelog} wallet:                              ${wallet}`);
                logger.log(`${prelog} hex confirmationCodePlain:       0x${hexParams.confirmationCodePlain.toString('hex')}`);
                const text2sign = prepareConTx.text2sign(wallet, hexParams);
                logger.log(`${prelog} => text2sign: ${text2sign}`);
                return prepareConTx.getSign(text2sign);
            })
            .then(signOutput => {
                logger.log(`${prelog} sign() output: ${JSON.stringify(signOutput)}`);
                return send_response(res, {
                    ok: true,
                    result: {
                        wallet,
                        params,
                        v: signOutput.v,
                        r: signOutput.r,
                        s: signOutput.s,
                    },
                });
            })
            .catch(err => {
                logger.log(`${prelog} ${err.log}`);
                return send_response(res, {ok: err.ok, err: err.msg});
            });
    });

    return router;
};
