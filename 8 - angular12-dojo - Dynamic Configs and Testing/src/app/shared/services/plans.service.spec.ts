import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PlansService } from './plans.service';
import {HttpClient, HttpClientModule, XhrFactory, } from '@angular/common/http';
// import { AppConfig} from '../../app.config';

describe('PlansService', () => {

  class MockConfig {
    getConfig() {
      return 'http://localhost:3000/';
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule],
      providers: [
        PlansService,
        {
          useClass: MockConfig
        }
        ]
    });

  });

  it('should be created', inject([
    PlansService], (service: PlansService) => {
    expect(service).toBeTruthy();
  }));
});