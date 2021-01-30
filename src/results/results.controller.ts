import { Controller, Post } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @Post('/import-from-beginning')
  importFromBeginning() {
    return this.resultsService.importFromBeginning();
  }
}
