import React, { useState } from 'react';

export const RatingModal = () => {

    return (
        <div className="modal" id="ratingModal">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">ShareTrips</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                
            <div class="mb-3">
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" type="file" id="formFile" />
                </div>
                <div class="mb-3">
                <label for="formFileMultiple" class="form-label">Multiple files input example</label>
                <input class="form-control" type="file" id="formFileMultiple" multiple />
                </div>
                <div class="mb-3">
                <label for="formFileDisabled" class="form-label">Disabled file input example</label>
                <input class="form-control" type="file" id="formFileDisabled" disabled />
                </div>
                <div class="mb-3">
                <label for="formFileSm" class="form-label">Small file input example</label>
                <input class="form-control form-control-sm" id="formFileSm" type="file" />
                </div>
                <div>
                <label for="formFileLg" class="form-label">Large file input example</label>
                <input class="form-control form-control-lg" id="formFileLg" type="file" />
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary">Enviar Valoración</button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default RatingModal