// / <reference types="Cypress" />
import { SchoolSchema } from '../../fixtures/schemas';

context('Schools API', () => {
  it('List Schools', () => {
    cy.request('/schools?lastEval=default').should(response => {
      const { body } = response;
     
      expect(response.status).to.be.within(200,205,'Check if request status is valid');
      expect(response).to.have.property('headers');
      expect(response).to.have.property('duration');
      expect(body).to.have.property('lastEvaluatedKey');
      expect(body).to.have.property('result');
      expect(body.result).to.have.length.lte(9);
      expect(body.result[0]).to.be.jsonSchema(SchoolSchema);
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
