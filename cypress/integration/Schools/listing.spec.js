// / <reference types="Cypress" />
import { SchoolSchema } from '../../fixtures/schemas';

context('Schools API', () => {
  it('List Schools', () => {
    cy.request('/schools?lastEval=default').should(response => {
      const { body , headers, duration } = response;
     
      expect(response.status).to.be.within(200,205,'Check if request status is valid');
      expect(headers).to.be.an('object','Request headers');
      expect(duration).to.be.be.within(1,2500,'Request duration');
      expect(body,'Request Body').to.have.property('lastEvaluatedKey');
      expect(body,'Request Body').to.have.property('result');
      expect(body.result,'Schools list').to.not.be.empty;
      body.result.forEach(school=>{
        expect(school).to.be.jsonSchema(SchoolSchema);
      })
      
    });
  });

  it('List Schools - With Pagination(Request 2 Pages)', () => {

    cy.request(`/schools?lastEval=default}`).then(response => {
      const { body, status } = response;
      cy.request(`/schools?lastEval=${body.lastEvaluatedKey}`).should(
        response => {
          const { body, status } = response;
          expect(status).to.eq(200);
          expect(response).to.have.property('headers');
          expect(response).to.have.property('duration');
          expect(body).to.have.property('lastEvaluatedKey');
          expect(body).to.have.property('result');
          expect(body.result).to.have.length.lte(9);
          expect(body.result[0]).to.be.jsonSchema(SchoolSchema);
        },
      );
    });
  });
});
