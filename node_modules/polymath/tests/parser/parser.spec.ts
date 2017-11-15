import {expect} from 'chai';
import 'mocha';
import parse from "../../src/parser/parser";

describe("Parser", function(){
    it("Shouldn't Explode", function(){
        expect(function(){
            let polynomial = parse("2x^3+7");
        }).to.not.throw();
    })
});