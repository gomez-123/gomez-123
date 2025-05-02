<?php 
include('../../../app/config.php');
include('../../../admin/layout/parte1.php');

include('../../../app/controllers/configuraciones/institucion/listado_de_instituciones.php');

?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <br>
  <div class="content">
    <div class="container">
      <div class="row">
        <h1>Listado de Instituciones</h1>
      </div>
      <br>
      <div class="row">

        <div class="col-md-12">
          <div class="card card-outline card-primary">
            <div class="card-header">
              <h3 class="card-title">Instituciones Registrados</h3>
              <div class="card-tools">
                <a href="create.php" class="btn btn-primary"><i class="bi bi-plus-square"></i> Crear nueva institucion</a>
              </div>
            </div>
            <div class="card-body">
              <table id="example1" class="table table-striped table-bordered table-hover table-sm">
                <thead>
                  <tr>
                    <th><center>Nro</center></th>
                    <th><center>Nombres de la institucion</center></th>
                    <th><center>Logo</center></th>
                    <th><center>Dirección</center></th>
                    <th><center>Teléfono</center></th>
                    <th><center>Celular</center></th>
                    <th><center>Correo electronico</center></th>
                    <th><center>Fecha de creación</center></th>
                    <th><center>Estado</center></th>
                    <th><center>Acciones</center></th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                  $contador_institucion = 0;
                  foreach ($instituciones as $institucione) {
                    $id_config_instituciones = $institucione['id_config_instituciones'];
                    $contador_institucion = $contador_institucion +1; ?>
                    <tr>
                      <td><center><?= $contador_institucion; ?></center></td>
                      <td><center><?= $institucione['nombre_institucion']; ?></center></td>
                      <td><center><?= $institucione['logo']; ?></center></td>
                      <td><center><?= $institucione['direccion']; ?></center></td>
                      <td><center><?= $institucione['telefono']; ?></center></td>
                      <td><center><?= $institucione['celular']; ?></center></td>
                      <td><center><?= $institucione['correo']; ?></center></td>
                      <td><center><?= $institucione['fyh_creacion']; ?></center></td>
                      <td><center><?= $institucione['estado']; ?></center></td>
                      <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                          <a href="show.php?id=<?= $id_config_instituciones; ?>" type="button" class="btn btn-info btn-sm"><i class="bi bi-eye"></i></a>
                          <a href="edit.php?id=<?= $id_config_instituciones; ?>" type="button" class="btn btn-success btn-sm"><i class="bi bi-pencil"></i></a>
                          <form action="<?= APP_URL; ?>/app/controllers/usuarios/delete.php" onclick="preguntar<?= $id_config_instituciones; ?>(event, <?= $id_config_instituciones; ?>)" method="post" id="miFormulario<?= $id_config_instituciones; ?>">
                            <input type="hidden" name="id_usuario" value="<?= $id_config_instituciones; ?>">
                            <button type="submit" class="btn btn-danger btn-sm" style="border-radius: 0px 5px 5px 0px"><i class="bi bi-trash"></i></button>
                          </form>
                        </div>
                      </td>
                    </tr>
                    <?php
                  }
                  ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>
</div>
<!-- /.content-wrapper -->

<?php
include('../../../admin/layout/parte2.php');
include('../../../layout/mensajes.php');
?>

<script>
  function preguntar<?= $id_config_instituciones; ?>(event) {
    event.preventDefault();
    Swal.fire({
      title: 'Eliminar registro',
      text: '¿Desea eliminar este registro?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#a5161d',
      denyButtonColor: '#270a0a',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        var form = $('#miFormulario <?=$id_config_instituciones;?>');
        form.submit();
      }
    });
  }

  $(function () {
    $("#example1").DataTable({
      "pageLength": 5,
      "language": {
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Instituciones",
        "infoEmpty": "Mostrando 0 a 0 de 0 Instituciones",
        "infoFiltered": "(Filtrado de _MAX_ total Instituciones)",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Instituciones",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      },
      "responsive": true, 
      "lengthChange": true, 
      "autoWidth": false,
      buttons: [
        {
          extend: 'collection',
          text: 'Reportes',
          orientation: 'landscape',
          buttons: [
            { text: 'Copiar', extend: 'copy' },
            { extend: 'pdf' },
            { extend: 'csv' },
            { extend: 'excel' },
            { text: 'Imprimir', extend: 'print' }
          ]
        },
        {
          extend: 'colvis',
          text: 'Visor de columnas',
          CollectionLayout: 'fixed three-column'
        }
      ]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
  });
</script>
