import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/Models/Categoria';
import { Curso } from 'src/app/Models/Curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  cursos!: Curso[];
  categorias!: Categoria[];
  cursoFormulario!: FormGroup;
  cursosFiltrado!: Curso[];
  tituloForm!: string;
  buscaFormulario!: FormGroup;
  idDelet!: number;
  dataInicio: any;
  dataTermino: any;
  private _filtrarCursos!: string;
  dataAtual: any = new Date();

  constructor(
    private cursoService: CursosService,
    private categoriaService: CategoriasService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.ListarCategorias();
    this.ListarCursos();
   
    this.cursoFormulario = this.formBuilder.group({
      cursoId: [0],
      descricao: ['', Validators.compose([Validators.required])],
      dataInicio: ['', Validators.compose([Validators.required])],
      dataTermino: ['', Validators.compose([Validators.required])],
      quantidade: [0],
      isStatus: [true],
      categoriaId: ['', Validators.required],
    });

    this.buscaFormulario = this.formBuilder.group({
      dataInicio : [],
      dataTermino : [],
      busca: []
    })
  }

  public get filtroCursos(){
    return this._filtrarCursos;
  }

  public set filtoCursos(value:string){
    this._filtrarCursos = value;
    this.cursosFiltrado = this.filtroCursos ? this.filtrarCurso(this.filtroCursos) : this.cursos;
  }

  filtrarCurso(filtrar: string): any{ filtrar = filtrar.toLocaleLowerCase();
    return this.cursos.filter((Curso: {descricao: string}) => Curso.descricao.toLocaleLowerCase().indexOf(filtrar) !== -1);
  }

  ListarCursos(): void{
    this.cursoService.ListarCursos().subscribe((resul) => {
      this.cursos = resul;
    this.cursosFiltrado = this.cursos;});
  }

  ListarCategorias(): void {
    this.categoriaService.ListarCategoria().subscribe((resul) => {
      this.categorias = resul; 
    });
  }

  LimparFormulario(): void {
    this.cursoFormulario.reset();
  }

  AlterarIdDeletar(id: any) {
    this.idDelet = id;
    console.log(this.idDelet);
  }

  ModalCadastro(): void {
    this.tituloForm = 'Curso Novo';
    this.cursoFormulario = new FormGroup({
        descricao: new FormControl(null, [Validators.required]),
        dataInicio: new FormControl(null, [Validators.required]),
        dataTermino: new FormControl(null, [Validators.required]),
        quantidade: new FormControl(null),
        isStatus: new FormControl(true),
        categoriaId: new FormControl(null, [Validators.required])
    });
  }
  Dataformatada(dt: any): Date{
    return dt.split('T')[0];
  }

  ModalAtualizar(cursoId: any) {
    this.cursoService.PegarCursoId(cursoId).subscribe(result => {
      this.tituloForm = 'Atualizar Curso';
      this.cursoFormulario = new FormGroup({
        cursoId: new FormControl(result.cursoId),
        descricao: new FormControl(result.descricao),
        dataInicio: new FormControl(this.Dataformatada(result.dataInicio)),
        dataTermino: new FormControl(this.Dataformatada(result.dataTermino)),
        quantidade: new FormControl(result.quantidade),
        isStatus: new FormControl(result.isStatus),
        categoriaId: new FormControl(result.categoriaId)
      });
      console.log(this.cursoFormulario);
    });
  }

  DeletarCruso(cursoId: number){
    this.cursoService.ExcluirCurso(cursoId).subscribe({
      next: (resp) =>{
        this.toastr.warning('Curso deletado com sucesso!!', 'Deletando');
        this.LimparFormulario();
        this.ListarCursos();
      },
      error: (resp) =>{
        this.toastr.error(resp.error.mensagem, 'Erro');
        this.LimparFormulario();
        },
    });
  }

  filtroData(){

    if(this.dataInicio > this.dataTermino){
      this.toastr.error('Data do término não pode ser menor que a data de início');
    } 
     else if(!this.dataInicio && !this.dataTermino){
      this.ListarCursos();
    }   
    else {
      this. filtrarDataInicioTermino(this.dataInicio, this.dataTermino)
    }
  }
  filtrarDataInicioTermino(dataInicio:any, dataTermino: any) : any
  {
    this.cursosFiltrado = this.cursos.filter(result =>{
      return (result.dataInicio >= dataInicio || result.dataTermino >= dataInicio) && (result.dataInicio <= dataTermino || result.dataTermino<= dataTermino)
    })
  }

  LimparFiltro(){
    this.buscaFormulario.reset();
    this.ListarCursos();
  }
}

