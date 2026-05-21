/**
 * @file src/module/yugen-utils.ts
 * utility class containing shared helper methods for yugen modules.
 **/

export class YugenUtils 
{
	/**
	 * capitalizes the first letter of a string.
	 **/
	public static capitalize( str: string ): string 
	{
		if ( !str ) 
		{
			return str;
		}

		return str.charAt( 0 ).toUpperCase( ) + str.slice( 1 );
	}

	/**
	 * checks if the current user is a gamemaster.
	 **/
	public static is_gm( ): boolean 
	{
		return ( game as any ).user.isGM;
	}

	/**
	 * determines if the current user is the primary active gamemaster.
	 **/
	public static is_primary_gm( ): boolean 
	{
		/** retrieve primary active gamemaster **/
		const primary_gm = ( game as any ).users.find( ( u: any ) => 
		{
			return u.isGM && u.active;
		} );

		return ( game as any ).user.id === primary_gm?.id;
	}

	/**
	 * checks if the current user owns a specific document.
	 **/
	public static has_ownership( doc: any ): boolean 
	{
		/** test user ownership permissions **/
		return doc.testUserPermission( ( game as any ).user, 'OWNER' );
	}

	/**
	 * retrieves a namespaced flag from a document, resolving synthetic tokens to actor context.
	 **/
	public static get_flag( doc: any, scope: string, key: string ): any 
	{
		if ( !doc ) 
		{
			return undefined;
		}

		const document = doc.document || doc;

		/** retrieve flag from document **/
		return document.getFlag( scope, key );
	}

	/**
	 * sets a namespaced flag on a document.
	 **/
	public static async set_flag( doc: any, scope: string, key: string, value: any, options: any = { } ): Promise<any> 
	{
		if ( !doc ) 
		{
			return undefined;
		}

		const document = doc.document || doc;

		/** set flag on document **/
		return await document.setFlag( scope, key, value, options );
	}

	/**
	 * registers socket listeners for cross-client communication.
	 **/
	public static register_socket( socket_name: string, callback: ( data: any ) => void ): void 
	{
		/** register socket handler callback **/
		( game as any ).socket.on( socket_name, callback );
	}

	/**
	 * emits a socket message to all clients.
	 **/
	public static emit_socket( socket_name: string, data: any ): void 
	{
		/** emit socket message **/
		( game as any ).socket.emit( socket_name, data );
	}

	/**
	 * force reloads a module stylesheet by injecting a cache-busting timestamp.
	 **/
	public static cache_bust_css( module_id: string ): void 
	{
		const timestamp = Date.now( );
		const query = `link[href*='${ module_id }']`;
		const old_link = document.querySelector( query );

		if ( old_link ) 
		{
			const new_link = document.createElement( 'link' );
			new_link.rel = 'stylesheet';
			new_link.href = `${ old_link.getAttribute( 'href' )?.split( '?' )[ 0 ] }?v=${ timestamp }`;

			/** replace legacy stylesheet element with cache-busted element **/
			old_link.parentNode?.replaceChild( new_link, old_link );
		}
	}

	/**
	 * gets currency object from an actor in a system-agnostic way.
	 **/
	public static get_actor_currency( actor: any ): { cp: number, sp: number, gp: number, pp: number } 
	{
		if ( !actor ) 
		{
			return { cp: 0, sp: 0, gp: 0, pp: 0 };
		}

		/** pf2e currency check **/
		const pf2e_currency = actor.system?.resources?.coinage;
		if ( pf2e_currency ) 
		{
			return pf2e_currency;
		}

		/** dnd5e currency check **/
		const dnd5e_currency = actor.system?.currency;
		if ( dnd5e_currency ) 
		{
			return dnd5e_currency;
		}

		return { cp: 0, sp: 0, gp: 0, pp: 0 };
	}
}
