import {expect} from 'chai';
import 'mocha';
import * as parser from "../../src/parser/poly-grammar";
import * as _ from "lodash";

describe("PEG.js Grammar", function(){
    it("Shouldn't Explode", function(){
        let output;
        expect(function(){
            output = parser.parse("2x^2+7x-32");
        }).not.to.throw();
        expect(output[1].co).to.equal(7);
        expect(_.last(output)['co']).to.equal(-32);
    })
});