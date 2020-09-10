/**
* @copyright 'Copyright 2020, Seton Hall University. All Rights Reserved.'
* @description 'Provides a means to interact with Academic Awards data.'
* @displayName 'Academic Awards Data'
* @filename '/cfcs/AcademicAwards.cfc'
* @hint 'Defines functions for interacting with academic awards.'
* @name 'AcademicAwards'
* @output false
*/
component
	rest=true
	restPath='academicAwards'
	returnFormat='json'
	produces='application/json,text/json'
	consumes='application/json,text/json,text/plain'
{
  // NOTE: Properties
  // property name='count' type='numeric' default=0 displayName='Item Count' hint='The total number of items returned.';
	property name='countLimit' type='numeric' displayName='Item Count Limit' hint='The maximum number of items to return.';
	property name='lastUpdated' type='date' displayName='Last Updated' hint='The date-timestamp of when the data was fetched.';
	property name='elementID' type='numeric' displayName='Element ID' hint='The ID of the custom element.';

	// NOTE: Add defaults for New Relic
	eventName = 'CommonSpotRestService';
	eventParams = createObject('java', 'java.util.HashMap');
	eventParams.put('Error Message', '');
	eventParams.put('Error Type', '');
	errorParams = createObject('java', 'java.util.HashMap');
	errorParams.put('Error Code', 'error-9997');

  this['elementName'] = 'AcademicAwards';

  categories = [];

  this['countLimit'] = 25;
  dataScrubbed = [];
  imageLarge = {};
  imageMedium = {};
  imageSmall = {};
  this['lastUpdated'] = now();

  /**
	* @displayName 'getElementInfo'
	* @description 'Gets information about Classrooms'
	* @hint 'gets information about Classrooms'
	* @output false
	*/
  remote struct function getElementInfo() 
    httpMethod='get'
    restPath='elementInfo'
    returnFormat='json'
    responseMessages="404:Not Found,200:successful,10:notdefined"
  {
    this['props'] = getElementProperties(this.elementName);

    data = '{ "created": "' & getHTTPTimeString(this.lastUpdated) & '", "id": ' & this.props.id & ', "description": "' & this.props.description & '", "defaultLayout": "' & this.props.defaultLayout & '", "fieldCount": "' & this.props.fieldCount & '", "state": "' & this.props.state & '", "type": "' & this.props.type & '", "fields": ' & serializeJSON(this.props.fields) & ' }';

    return deserializeJSON(data);
  }

  /**
	* @displayName 'getAll'
	* @description 'gets all Academic Award data'
	* @hint 'gets all Academic Award data'
	* @output false
	*/
  remote struct function getAll()
		httpMethod='get'
		restPath='all'
		returnFormat='json'
		responseMessages="404:Not Found,200:successful,10:notdefined"
	{
    try {
			// NOTE: Get the element properties.
			this['props'] = getElementProperties(this.elementName);

			// NOTE: Get fresh data from the db
			items = application.adf.ceData.getCEData(this.elementName);
			// writeDump(var=items, expand=false);

			// NOTE: Get total number of objects
			var count = arrayLen(items);

			// NOTE: Loop over the items array and get the items we want to display
			for ( i in items ) {

				formattedData = formatAwardsData(i);
				// writeDump(var=formattedData, expand=false, label='formattedData');

				// NOTE: Append to the new array
				arrayAppend(dataScrubbed, formattedData, false);
				// writeDump(var=dataScrubbed, expand=false, label='dataScrubbed');
			}
		} catch(any error) {
      pageContext.setContentType('text/html; UTF-8');
			writeDump(var=error, expand=false, label='Global Try/Catch.');
			writeDump(var=data, expand=false, label='getAll() Global Try/Catch');
    }

    finally {
      data = formatJSONOutput(data=dataScrubbed, count=count);

			return data;
    }


  } // END getAll


  /**
	* @displayName 'formatDataOutput'
	* @description 'Formats the data for JSON output'
	* @hint 'Formats item data for JSON'
	* @output false
	**/
	private struct function formatJSONOutput(
		required array data,
		required numeric count
	) {

    data = '{ "created": "' & getHTTPTimeString(this.lastUpdated) & '", "elementName": "' & this.elementName & '", "description": "' & this.props.description & '", "elementID": ' & this.props.id & ', "count": ' & arguments.count & ', "data": ' & serializeJSON(arguments.data) & ' }';

    return deserializeJSON(data);
  } // END formatJSONOutput



  /**
	* @displayName 'formatAwardsData'
	* @description 'Formats the item data for the JSON object'
	* @hint 'Formats item data'
	* @output false
	**/
	private struct function formatAwardsData(
		required struct data
	) {
		// categories = [];
		var tmp = {};
		// writeDump(var=arguments, expand=false, label='formatAwardsData arguments');

    tmp['aidType'] = data.values.aidType;
    tmp['amount'] = data.values.amount;
		tmp['applicationFormExternal'] = data.values.applicationFormExternal;
		tmp['applicationFormInternal'] = data.values.applicationFormInternal;
    tmp['applicationProcedures'] = data.values.applicationProcedures;
		tmp['accountType'] = data.values.accountType;
    tmp['available'] = data.values.available;
    tmp['bnrFund'] = data.values.bnrFund;
    tmp['category'] = data.values.category;
    tmp['deadline'] = data.values.deadline;
    tmp['description'] = data.values.description;
    tmp['displayScholarship'] = data.values.displayScholarship;
    tmp['eligibilityProgram'] = data.values.eligibilityProgram;
		tmp['eligibilityRequirements'] = data.values.eligibilityRequirements;
		tmp['migrationNotes'] = data.values.migrationNotes;
    tmp['name'] = data.values.name;
    tmp['notes'] = data.values.notes;
    tmp['renewalRequirements'] = data.values.renewalRequirements;
    tmp['selectionBody'] = data.values.selectionBody;
    tmp['studentStatus'] = data.values.studentStatus;
    tmp['tags'] = data.values.tags;
    tmp['units'] = data.values.units;
    tmp['uuid'] = data.values.uuid;
    
		// writeDump(var=tmp, expand=false, label='tmp formatData...');
		return tmp;
	}


  /**
	* @displayName 'getElementProperties'
	* @description 'Gets the custom element properties'
	* @hint 'Gets custom element properties'
	* @output false
	**/
	private struct function getElementProperties(
		required string elementName
	) {
		data = {};

		try {
			// NOTE: Create a reference to the CS CustomElement API Component
			objCustomElement = Server.CommonSpot.api.getObject('CustomElement');
			// writeDump(var=objCustomElement.getList(category='Seton Custom Elements'), expand=false, label='Custom Element List');
			// exit;

			// NOTE: Get info about the custom elements.
			elementList = objCustomElement.getList(category='Seton Custom Elements');
			// writeDump(var=elementList, expand=false, label='element list');

			// NOTE: Loop over each custom element in the category to find the one we want.
			for (row in elementList) {
				if ( row.name eq arguments.elementName ) {
					// writeDump(var=row, expand=false, label='element row data from getElementProperties()');
					// NOTE: Get the custom element form ID from the ADF
					// data['id'] = application.adf.ceData.getFormIDByCEName(arguments.elementName);

					data['defaultLayout'] = row.defaultLayoutName;
					data['description'] = row.description;
					data['fieldCount'] = row.elementFieldCount;
					data['id'] = row.id;
					data['state'] = row.state;
					data['type'] = row.type;

					// NOTE: Get the custom element's info.
					// data['info'] = objCustomElement.getInfo(row.id);

					// // NOTE: Get the custom element's miscellaneous info.
					// miscInfo = objCustomElement.getMiscProps(row.id);
					// data['viewingPagePath'] = miscInfo.ViewingPageFullPath;
					// data['viewingPageID'] = miscInfo.viewingPageID;
					// data['displayPageURL'] = data.viewingPagePath & '?customel_datapageid_' & row.id & '=';

					// NOTE: Get the custom element's fields
					data['fields'] = {};
					fieldsQuery = objCustomElement.getFields(row.id);
					// writeDump(var=fieldsQuery, expand=false, label='fields');

					fieldsQuery.each(function(row, currentRow){
						// writeDump(var=row, expand=false, label='row ' & currentRow & ' - ' & row.name);
						tmp[row.name.toString()] = {};
						tmp[row.name.toString()]['description'] = row.description;
						tmp[row.name.toString()]['id'] = row.id;
						tmp[row.name.toString()]['label'] = row.label;
						tmp[row.name.toString()]['name'] = row.name;
						tmp[row.name.toString()]['required'] = row.required;
						tmp[row.name.toString()]['type'] = row.type;
						tmp[row.name.toString()]['typeID'] = row.typeID;

						// writeDump(var=tmp, expand=false);
						data.fields.append(tmp, false);
					});

				} else {
					// Note: we couldn't find the requested element. Thrown an error.
					// throw(message='Requested element not found.', errorCode='error-0002', detail='The requested element, "' & arguments.elementName & '", could not be found. Please check the element name and try again.');
				}
			}

			// writeDump(var=data, expand=false, label='element data from getElementProperties()');
			return data;
		}

		catch (any error) {
			writeDump(var=error, expand=false, label='element data error');
			rethrow;
		}

		finally {}
	}

} // End component