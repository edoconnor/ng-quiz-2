"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const capital_service_1 = require("./capital.service");
describe('CapitalService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(capital_service_1.CapitalService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
